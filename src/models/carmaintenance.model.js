import mongoose, { Schema } from "mongoose";

const carMaintenanceSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    carRegistrationNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    ownerWhatsAppNumber: {
      type: String,
      required: true,
      trim: true,
    },
    lastServiceDate: {
      type: Date,
      required: true,
    },
    meterReading: {
      type: Number,
      required: true,
    },
    serviceCost: {
      type: Number,
      required: true,
    },
    nextServiceDate: {
      type: Date,
      required: true,
    },
    reminderSent: {
      type: Boolean,
      default: false,
    },
    optInMessageSent: {
      type: Boolean,
      default: false,
    },
    optInMessageSentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for efficient querying
carMaintenanceSchema.index({ nextServiceDate: 1, reminderSent: 1 });

export const CarMaintenance = mongoose.model("CarMaintenance", carMaintenanceSchema);
