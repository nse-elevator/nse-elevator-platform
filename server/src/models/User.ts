import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'admin';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin'], // Structured for future expansion e.g. ['admin', 'dispatcher', 'engineer']
      default: 'admin',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', UserSchema);
