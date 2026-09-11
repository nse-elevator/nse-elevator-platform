import mongoose, { Schema, Document } from 'mongoose';

export interface ISettings extends Document {
  companyName: string;
  brandName: string;
  contactPhone: string;
  whatsappNumber: string;
  dispatchEmail: string;
  emergencyBannerText: string;
  emergencyResponseWindow: string;
  headOfficeAddress: string;
  puneBranch1Address: string;
  businessHours: string;
  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema: Schema = new Schema(
  {
    companyName: { type: String, default: 'NSE – New Sahyadri Elevator' },
    brandName: { type: String, default: 'NSE SMART' },
    contactPhone: { type: String, default: '+91 90110 96990' },
    whatsappNumber: { type: String, default: '+91 90110 96990' },
    dispatchEmail: { type: String, default: 'office.pune@nsei.in' },
    emergencyBannerText: {
      type: String,
      default: 'NSE 24/7 Breakdown Dispatch • Rapid Emergency Response Across Corridors',
    },
    emergencyResponseWindow: { type: String, default: '24/7 Rapid Response' },
    headOfficeAddress: {
      type: String,
      default: 'Airoli, Navi Mumbai, Maharashtra',
    },
    puneBranch1Address: {
      type: String,
      default: 'Swant Plaza, Shop No. 203, Dattanagar, Pune, Maharashtra – 411046',
    },
    businessHours: {
      type: String,
      default: '24/7 Emergency Dispatch • Office Mon–Sat 9:00 AM – 7:00 PM',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Singleton helper: always retrieves or initializes the single settings document.
 */
SettingsSchema.statics.getSingleton = async function () {
  let doc = await this.findOne();
  if (!doc) {
    doc = await this.create({});
  }
  return doc;
};

export const Settings =
  (mongoose.models.Settings as mongoose.Model<ISettings> & { getSingleton: () => Promise<ISettings> }) ||
  mongoose.model<ISettings>('Settings', SettingsSchema);
