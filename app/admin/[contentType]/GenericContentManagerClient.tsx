'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { notFound } from 'next/navigation';
import { adminContentConfigs, AdminContentConfig } from './adminContentConfig';

interface GenericContentManagerClientProps {
  contentType: string;
}

export default function GenericContentManagerClient({ contentType }: GenericContentManagerClientProps) {
  const config: AdminContentConfig | undefined = adminContentConfigs[contentType.toLowerCase()];

  if (!config) {
    notFound();
  }

  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Form View State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Fetch paginated list
  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (statusFilter !== 'all') {
        q.set('status', statusFilter);
      }

      if (searchQuery.trim()) {
        q.set('search', searchQuery.trim());
      }

      const res = await fetch(`/api/admin/${config.key}?${q.toString()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setItems(data.data);
        setTotal(data.meta?.total || 0);
        setTotalPages(data.meta?.totalPages || 1);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [config.key, page, limit, statusFilter, searchQuery]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Open Form for Create
  const handleOpenCreate = () => {
    const initial: Record<string, any> = {};
    for (const field of config.fields) {
      if (field.type === 'stringArray') {
        initial[field.name] = [];
      } else {
        initial[field.name] = field.defaultValue !== undefined ? field.defaultValue : '';
      }
    }
    setFormData(initial);
    setEditingItem(null);
    setFormErrors({});
    setIsFormOpen(true);
  };

  // Open Form for Edit
  const handleOpenEdit = (item: any) => {
    const initial: Record<string, any> = {};
    for (const field of config.fields) {
      const val = item[field.name];
      if (field.type === 'stringArray') {
        initial[field.name] = Array.isArray(val)
          ? [...val]
          : typeof val === 'string' && val
          ? val.split(/[\n,]+/).map((s: string) => s.trim()).filter(Boolean)
          : [];
      } else {
        initial[field.name] = val !== undefined ? val : '';
      }
    }
    setFormData(initial);
    setEditingItem(item);
    setFormErrors({});
    setIsFormOpen(true);
  };

  // Soft Delete (Archive)
  const handleArchive = async (item: any) => {
    const identifier = item.title || item.name || item.cityName || item.buildingName || item.authorName || item._id;
    if (!confirm(`Are you sure you want to soft-delete (archive) '${identifier}'? It will be excluded from public view.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/${config.key}/${item._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setActionSuccessMsg(`'${identifier}' has been archived.`);
        setTimeout(() => setActionSuccessMsg(null), 4000);
        fetchItems();
      } else {
        alert(data.error?.message || 'Failed to archive item.');
      }
    } catch (err) {
      alert('Network error while archiving item.');
    }
  };

  // Validate and Submit Form
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    // Client-side validation for required fields
    const errors: Record<string, string> = {};
    for (const field of config.fields) {
      if (field.required) {
        if (field.type === 'stringArray') {
          if (!Array.isArray(formData[field.name]) || formData[field.name].length === 0) {
            errors[field.name] = `${field.label} requires at least one item`;
          }
        } else if (!formData[field.name] || String(formData[field.name]).trim() === '') {
          errors[field.name] = `${field.label} is required`;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setSaving(true);

    try {
      // Process string arrays
      const payload: Record<string, any> = { ...formData };
      for (const field of config.fields) {
        if (field.type === 'stringArray') {
          if (Array.isArray(payload[field.name])) {
            payload[field.name] = payload[field.name]
              .map((s: string) => String(s).trim())
              .filter(Boolean);
          } else if (typeof payload[field.name] === 'string') {
            payload[field.name] = payload[field.name]
              .split(/[\n,]+/)
              .map((s: string) => s.trim())
              .filter(Boolean);
          } else {
            payload[field.name] = [];
          }
        } else if (field.type === 'number') {
          payload[field.name] = Number(payload[field.name]);
        }
      }

      const isEdit = Boolean(editingItem);
      const url = isEdit
        ? `/api/admin/${config.key}/${editingItem._id}`
        : `/api/admin/${config.key}`;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.error?.details) {
          const detailErrors: Record<string, string> = {};
          for (const [k, v] of Object.entries(data.error.details)) {
            detailErrors[k] = Array.isArray(v) ? v[0] : String(v);
          }
          setFormErrors(detailErrors);
        } else {
          setFormErrors({ _global: data.error?.message || 'Failed to save record' });
        }
        return;
      }

      setIsFormOpen(false);
      setActionSuccessMsg(
        isEdit ? `${config.singularTitle} updated successfully` : `${config.singularTitle} created successfully`
      );
      setTimeout(() => setActionSuccessMsg(null), 4000);
      fetchItems();
    } catch (err) {
      setFormErrors({ _global: 'Network error saving record' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Action Notification Banner */}
      {actionSuccessMsg && (
        <div className="p-3 bg-safety-500/15 border border-safety-500/40 text-safety-700 text-xs font-mono font-bold rounded-sm flex items-center justify-between">
          <span>✅ {actionSuccessMsg}</span>
          <button onClick={() => setActionSuccessMsg(null)} className="text-safety-800 text-sm">✕</button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-steel-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{config.icon}</span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emergency-500">
              Content Administration
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-steel-950 tracking-tight mt-0.5">
            {config.pluralTitle}
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-emergency-500 hover:bg-emergency-600 text-white font-mono text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-sm transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>+ Add New {config.singularTitle}</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-steel-300 p-4 rounded-sm shadow-milled flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 font-mono text-xs">
          {[
            { id: 'all', label: 'All Records' },
            { id: 'published', label: 'Published' },
            { id: 'draft', label: 'Draft' },
            { id: 'archived', label: 'Archived' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setStatusFilter(tab.id);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-sm font-bold transition-colors ${
                statusFilter === tab.id
                  ? 'bg-emergency-500 text-white shadow-sm'
                  : 'text-steel-600 hover:bg-steel-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder={`Search ${config.pluralTitle}...`}
            className="w-full bg-steel-50 border border-steel-300 focus:border-emergency-500 rounded-sm px-3 py-1.5 text-base sm:text-xs text-steel-900 placeholder-steel-400 focus:outline-none focus:ring-1 focus:ring-emergency-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1.5 text-steel-400 hover:text-steel-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* List Table View */}
      <div className="bg-white border border-steel-300 rounded-sm shadow-milled overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-steel-500 animate-pulse">
            Loading {config.pluralTitle.toLowerCase()}...
          </div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-steel-400">
            No {config.pluralTitle.toLowerCase()} found matching the criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-steel-950 text-white font-mono uppercase text-[10px] tracking-wider border-b border-steel-800">
                <tr>
                  {config.displayColumns.map((col) => (
                    <th key={col.key} className="py-3 px-4">
                      {col.label}
                    </th>
                  ))}
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-steel-200">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-steel-50/70 transition-colors">
                    {config.displayColumns.map((col) => {
                      const val = item[col.key];

                      if (col.key === 'status') {
                        const isPub = val === 'published';
                        const isArch = val === 'archived';
                        return (
                          <td key={col.key} className="py-3.5 px-4 font-mono text-[11px]">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-sm border font-bold ${
                                isPub
                                  ? 'bg-safety-500/10 text-safety-600 border-safety-500/30'
                                  : isArch
                                  ? 'bg-steel-500/10 text-steel-500 border-steel-300'
                                  : 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                              }`}
                            >
                              {val}
                            </span>
                          </td>
                        );
                      }

                      if (col.key === 'updatedAt' || col.key === 'createdAt') {
                        return (
                          <td key={col.key} className="py-3.5 px-4 font-mono text-[11px] text-steel-500">
                            {val ? new Date(val).toLocaleDateString() : '—'}
                          </td>
                        );
                      }

                      return (
                        <td key={col.key} className="py-3.5 px-4">
                          <span
                            className={
                              col.isTitle
                                ? 'font-bold text-steel-950 block text-xs'
                                : 'text-steel-600 font-mono text-[11px]'
                            }
                          >
                            {col.format ? col.format(val) : val !== undefined ? String(val) : '—'}
                          </span>
                          {col.isTitle && item.isPlaceholder && (
                            <span className="inline-flex items-center gap-1 mt-1 px-1.5 py-0.5 rounded-xs bg-amber-500/10 text-amber-700 border border-amber-500/30 text-[9px] font-mono font-bold uppercase tracking-wider whitespace-nowrap">
                              ⚠️ PLACEHOLDER — Replace before launch
                            </span>
                          )}
                        </td>
                      );
                    })}

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="bg-steel-100 hover:bg-steel-200 text-steel-800 px-2.5 py-1 rounded-sm font-mono text-[11px] font-bold transition-colors"
                      >
                        Edit
                      </button>
                      {item.status !== 'archived' && (
                        <button
                          onClick={() => handleArchive(item)}
                          className="bg-emergency-500/10 hover:bg-emergency-500/20 text-emergency-600 border border-emergency-500/30 px-2.5 py-1 rounded-sm font-mono text-[11px] font-bold transition-colors"
                        >
                          Archive
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="p-4 bg-steel-50 border-t border-steel-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <span className="text-steel-600">
            Showing {items.length} of {total} records
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1 bg-white border border-steel-300 rounded-sm font-bold disabled:opacity-40 hover:bg-steel-100"
            >
              Previous
            </button>
            <span className="text-steel-700">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1 bg-white border border-steel-300 rounded-sm font-bold disabled:opacity-40 hover:bg-steel-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Modal Form */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-steel-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-steel-400 rounded-sm max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto font-sans">
            <div className="flex items-start justify-between border-b border-steel-200 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emergency-500 font-bold">
                  {editingItem ? 'Edit Existing' : 'Create New'} {config.singularTitle}
                </span>
                <h2 className="text-xl font-extrabold text-steel-950 mt-0.5">
                  {editingItem
                    ? editingItem.title || editingItem.name || editingItem.cityName || editingItem.buildingName || editingItem.authorName || 'Edit Record'
                    : `Add ${config.singularTitle}`}
                </h2>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-steel-400 hover:text-steel-800 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            {formErrors._global && (
              <div className="p-3 bg-emergency-500/10 border border-emergency-500/40 text-emergency-600 text-xs rounded-sm">
                {formErrors._global}
              </div>
            )}

            {/* Generated Form */}
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {config.fields.map((field) => {
                  const isFullWidth = field.type === 'textarea' || field.type === 'stringArray' || field.name === 'title' || field.name === 'metaDescription';
                  const error = formErrors[field.name];

                  return (
                    <div
                      key={field.name}
                      className={isFullWidth ? 'md:col-span-2 space-y-1' : 'space-y-1'}
                    >
                      <label className="block text-xs font-mono uppercase font-bold text-steel-700">
                        {field.label} {field.required && <span className="text-emergency-500">*</span>}
                      </label>

                      {field.type === 'textarea' ? (
                        <textarea
                          rows={4}
                          value={formData[field.name] || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, [field.name]: e.target.value })
                          }
                          placeholder={field.placeholder}
                          className={`w-full bg-steel-50 border rounded-sm p-2.5 text-base sm:text-xs text-steel-900 focus:outline-none focus:ring-1 focus:ring-emergency-500 ${
                            error ? 'border-emergency-500' : 'border-steel-300'
                          }`}
                        />
                      ) : field.type === 'select' ? (
                        <select
                          value={formData[field.name] || field.defaultValue || 'published'}
                          onChange={(e) =>
                            setFormData({ ...formData, [field.name]: e.target.value })
                          }
                          className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2.5 text-base sm:text-xs text-steel-900 font-mono focus:outline-none focus:ring-1 focus:ring-emergency-500"
                        >
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'number' ? (
                        <input
                          type="number"
                          value={formData[field.name] || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, [field.name]: e.target.value })
                          }
                          placeholder={field.placeholder}
                          className={`w-full bg-steel-50 border rounded-sm p-2.5 text-base sm:text-xs text-steel-900 font-mono focus:outline-none focus:ring-1 focus:ring-emergency-500 ${
                            error ? 'border-emergency-500' : 'border-steel-300'
                          }`}
                        />
                      ) : field.type === 'stringArray' ? (
                        <TagInput
                          tags={Array.isArray(formData[field.name]) ? formData[field.name] : []}
                          onChange={(tags) =>
                            setFormData({ ...formData, [field.name]: tags })
                          }
                          placeholder={field.placeholder || `Type item and press Enter or comma...`}
                        />
                      ) : (
                        <input
                          type="text"
                          value={formData[field.name] || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, [field.name]: e.target.value })
                          }
                          placeholder={field.placeholder}
                          className={`w-full bg-steel-50 border rounded-sm p-2.5 text-base sm:text-xs text-steel-900 focus:outline-none focus:ring-1 focus:ring-emergency-500 ${
                            error ? 'border-emergency-500' : 'border-steel-300'
                          }`}
                        />
                      )}

                      {error && (
                        <p className="text-[11px] text-emergency-600 font-mono">{error}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-steel-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="bg-white hover:bg-steel-100 border border-steel-300 text-steel-700 font-mono text-xs font-bold px-4 py-2 rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-emergency-500 hover:bg-emergency-600 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase tracking-wider px-6 py-2 rounded-sm shadow-sm"
                >
                  {saving ? 'Saving...' : editingItem ? 'Update Record' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TagInput({
  tags,
  onChange,
  placeholder,
}: {
  tags: string[];
  onChange: (newTags: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState('');

  const addTag = (val: string) => {
    const rawItems = val.split(/[,;\n]+/);
    const updated = [...tags];
    for (const item of rawItems) {
      const clean = item.trim();
      if (clean && !updated.some((t) => t.toLowerCase() === clean.toLowerCase())) {
        updated.push(clean);
      }
    }
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
        setInputValue('');
      }
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const handleBlur = () => {
    if (inputValue.trim()) {
      addTag(inputValue);
      setInputValue('');
    }
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="w-full bg-steel-50 border border-steel-300 rounded-sm p-2 text-xs text-steel-900 focus-within:border-brand-orange focus-within:ring-1 focus-within:ring-brand-orange transition-all">
      {/* Active Tags / Chips */}
      <div className="flex flex-wrap gap-1.5 mb-2 empty:mb-0">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-300 text-slate-800 px-2.5 py-1 rounded-md text-xs font-mono shadow-2xs group"
          >
            <span>{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(idx)}
              className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full w-3.5 h-3.5 flex items-center justify-center transition-colors cursor-pointer"
              title={`Remove ${tag}`}
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 mt-1">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? placeholder || 'Type locality and press Enter or comma...' : '+ Add another...'}
          className="flex-1 bg-transparent text-base sm:text-xs text-steel-900 focus:outline-none placeholder:text-steel-400 font-mono py-1"
        />
        {inputValue.trim() && (
          <button
            type="button"
            onClick={() => {
              addTag(inputValue);
              setInputValue('');
            }}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white text-[11px] font-mono font-bold px-2 py-0.5 rounded cursor-pointer transition-colors shrink-0"
          >
            + Add
          </button>
        )}
      </div>

      <div className="text-[10px] font-mono text-steel-400 mt-1.5 flex items-center justify-between border-t border-steel-200/60 pt-1">
        <span>{tags.length} {tags.length === 1 ? 'item' : 'items'} configured</span>
        <span>Press Enter, comma, or paste to add</span>
      </div>
    </div>
  );
}

