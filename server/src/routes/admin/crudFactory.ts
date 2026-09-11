import { Router, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { contentRegistry, ContentTypeDefinition, slugify } from './contentRegistry';
import { sendSuccess, sendError } from '../../middleware/errorHandler';

/**
 * Parses sort query string like "createdAt:desc", "-updatedAt", "title:asc" into a Mongoose sort object.
 */
function parseSortQuery(sortQuery?: string): Record<string, 1 | -1> {
  if (!sortQuery) {
    return { updatedAt: -1, createdAt: -1 };
  }

  const sortObj: Record<string, 1 | -1> = {};

  // Support comma-separated sort fields, e.g. "-createdAt,title"
  const parts = sortQuery.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.startsWith('-')) {
      sortObj[trimmed.substring(1)] = -1;
    } else if (trimmed.includes(':')) {
      const [field, dir] = trimmed.split(':');
      sortObj[field.trim()] = dir.toLowerCase() === 'desc' ? -1 : 1;
    } else {
      sortObj[trimmed] = 1;
    }
  }

  return Object.keys(sortObj).length > 0 ? sortObj : { updatedAt: -1, createdAt: -1 };
}

/**
 * Finds a document by MongoDB _id or by slug field if not a valid ObjectId.
 */
async function findDocByIdOrSlug(
  model: mongoose.Model<any>,
  idOrSlug: string,
  slugField?: string
) {
  if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
    const docById = await model.findById(idOrSlug);
    if (docById) return docById;
  }

  if (slugField) {
    return model.findOne({ [slugField]: idOrSlug.toLowerCase() });
  }

  return null;
}

export function createGenericCrudRouter(): Router {
  const router = Router({ mergeParams: true });

  // Middleware to resolve contentType parameter to registered model definition
  router.use('/:contentType', (req: Request, res: Response, next: NextFunction) => {
    const { contentType } = req.params;
    const def = contentRegistry.get(contentType.toLowerCase());

    if (!def) {
      return sendError(
        res,
        'INVALID_CONTENT_TYPE',
        `Content type '${contentType}' is not recognized. Supported types: services, locations, industries, case-studies, blog, careers, testimonials`,
        404
      );
    }

    // Attach definition to request object
    (req as any).contentDef = def;
    next();
  });

  // 1. GET /api/admin/:contentType (Paginated, filterable, sortable)
  router.get('/:contentType', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const def: ContentTypeDefinition = (req as any).contentDef;
      const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
      const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 10));
      const skip = (page - 1) * limit;

      const filter: Record<string, any> = {};

      // Filter by status if explicitly requested (e.g. ?status=published, ?status=draft, ?status=archived)
      // If omitted, admin sees ALL records across all statuses
      if (req.query.status) {
        filter.status = req.query.status;
      }

      // Keyword / Text Search across designated fields
      const searchQuery = (req.query.search || req.query.q) as string;
      if (searchQuery && def.searchFields.length > 0) {
        const regex = new RegExp(searchQuery.trim(), 'i');
        filter.$or = def.searchFields.map((field) => ({ [field]: regex }));
      }

      const sort = parseSortQuery(req.query.sort as string);

      const [items, total] = await Promise.all([
        def.model.find(filter).sort(sort).skip(skip).limit(limit).lean(),
        def.model.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(total / limit);

      return sendSuccess(res, items, {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        contentType: def.key,
      });
    } catch (error) {
      return next(error);
    }
  });

  // 2. GET /api/admin/:contentType/:id (Single record including drafts/archived)
  router.get('/:contentType/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const def: ContentTypeDefinition = (req as any).contentDef;
      const { id } = req.params;

      const doc = await findDocByIdOrSlug(def.model, id, def.slugField);

      if (!doc) {
        return sendError(
          res,
          'NOT_FOUND',
          `${def.displayName} with identifier '${id}' was not found.`,
          404
        );
      }

      return sendSuccess(res, doc);
    } catch (error) {
      return next(error);
    }
  });

  // 3. POST /api/admin/:contentType (Create and validate with Zod)
  router.post('/:contentType', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const def: ContentTypeDefinition = (req as any).contentDef;

      // Auto-generate slug if missing and source field exists
      const body = { ...req.body };
      if (def.slugField && (!body[def.slugField] || body[def.slugField].trim() === '')) {
        const sourceVal = def.slugSourceField ? body[def.slugSourceField] : '';
        if (sourceVal) {
          body[def.slugField] = slugify(sourceVal);
        }
      }

      // Validate against Zod schema
      const parseResult = def.createSchema.safeParse(body);
      if (!parseResult.success) {
        const fieldErrors = parseResult.error.flatten().fieldErrors;
        return sendError(
          res,
          'VALIDATION_ERROR',
          `Validation failed for creating ${def.displayName}`,
          422,
          fieldErrors
        );
      }

      const validatedData = parseResult.data;

      // Check for slug conflict if model uses slugs
      if (def.slugField && validatedData[def.slugField]) {
        const slugVal = validatedData[def.slugField];
        const existing = await def.model.findOne({ [def.slugField]: slugVal });
        if (existing) {
          return sendError(
            res,
            'SLUG_EXISTS',
            `A ${def.displayName} with slug '${slugVal}' already exists. Please choose a unique slug.`,
            409,
            { [def.slugField]: [`Slug '${slugVal}' is already taken`] }
          );
        }
      }

      const created = await def.model.create(validatedData);

      return sendSuccess(res, created, { message: `${def.displayName} created successfully` }, 201);
    } catch (error) {
      return next(error);
    }
  });

  // 4. PUT /api/admin/:contentType/:id (Update)
  router.put('/:contentType/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const def: ContentTypeDefinition = (req as any).contentDef;
      const { id } = req.params;

      const doc = await findDocByIdOrSlug(def.model, id, def.slugField);

      if (!doc) {
        return sendError(
          res,
          'NOT_FOUND',
          `${def.displayName} with identifier '${id}' was not found.`,
          404
        );
      }

      // Validate payload with update schema
      const parseResult = def.updateSchema.safeParse(req.body);
      if (!parseResult.success) {
        const fieldErrors = parseResult.error.flatten().fieldErrors;
        return sendError(
          res,
          'VALIDATION_ERROR',
          `Validation failed for updating ${def.displayName}`,
          422,
          fieldErrors
        );
      }

      const validatedData = parseResult.data;

      // Check slug uniqueness if slug is being modified
      if (def.slugField && validatedData[def.slugField]) {
        const newSlug = validatedData[def.slugField];
        const conflict = await def.model.findOne({
          _id: { $ne: doc._id },
          [def.slugField]: newSlug,
        });

        if (conflict) {
          return sendError(
            res,
            'SLUG_EXISTS',
            `A ${def.displayName} with slug '${newSlug}' already exists.`,
            409,
            { [def.slugField]: [`Slug '${newSlug}' is already taken by another record`] }
          );
        }
      }

      // Apply updates and save
      Object.assign(doc, validatedData);
      const updated = await doc.save();

      return sendSuccess(res, updated, { message: `${def.displayName} updated successfully` });
    } catch (error) {
      return next(error);
    }
  });

  // 5. DELETE /api/admin/:contentType/:id (Soft delete: set status to 'archived')
  router.delete('/:contentType/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const def: ContentTypeDefinition = (req as any).contentDef;
      const { id } = req.params;

      const doc = await findDocByIdOrSlug(def.model, id, def.slugField);

      if (!doc) {
        return sendError(
          res,
          'NOT_FOUND',
          `${def.displayName} with identifier '${id}' was not found.`,
          404
        );
      }

      // Soft delete: update status to 'archived', NEVER hard-delete
      doc.status = 'archived';
      await doc.save();

      return sendSuccess(res, {
        id: doc._id,
        status: doc.status,
        archived: true,
        message: `${def.displayName} '${doc.title || doc.name || doc.cityName || doc.buildingName || doc._id}' has been soft-deleted (archived).`,
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
}

export default createGenericCrudRouter;
