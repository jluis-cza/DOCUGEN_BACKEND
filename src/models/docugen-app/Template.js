// TEMPLATE MODEL

import mongoose from 'mongoose';

// *************************************************************************************************

// Document
const TemplateSchema = new mongoose.Schema(
  {},
  {
    timestamps: true,
  }
);

// *************************************************************************************************
// Hooks

// *************************************************************************************************
// Methods

const Template = mongoose.model('Account', TemplateSchema);
export default Template;
