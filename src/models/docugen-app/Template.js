// TEMPLATE MODEL

import mongoose from 'mongoose';

const ElementSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ['text', 'title', 'paragraph', 'image', 'placeholder', 'rect', 'line'],
      required: true,
    },
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
    width: { type: Number, default: 100 },
    height: { type: Number, default: 40 },
    rotation: { type: Number, default: 0 },
    text: { type: String, default: '' },
    fontSize: { type: Number, default: 16 },
    fontWeight: { type: String, default: 'normal' },
    color: { type: String, default: '#111111' },
    align: { type: String, default: 'left' },
    placeholderKey: { type: String, default: '' },
    src: { type: String, default: '' },
    fill: { type: String, default: '#ffffff' },
    stroke: { type: String, default: '#000000' },
    locked: { type: Boolean, default: false },
  },
  { _id: false }
);

const TemplateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    dimensions: {
      width: { type: Number, default: 794 },
      height: { type: Number, default: 1123 },
      unit: { type: String, default: 'px' },
    },
    page: {
      backgroundColor: { type: String, default: '#ffffff' },
      margin: {
        top: { type: Number, default: 40 },
        right: { type: Number, default: 40 },
        bottom: { type: Number, default: 40 },
        left: { type: Number, default: 40 },
      },
    },
    canvas: {
      version: { type: Number, default: 1 },
      zoom: { type: Number, default: 1 },
      background: { type: String, default: '#ffffff' },
    },
    elements: [ElementSchema],
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

TemplateSchema.statics.findByOwner = async function (ownerId, query = {}) {
  return this.find({ owner: ownerId, ...query }).sort({ updatedAt: -1 });
};

TemplateSchema.statics.getFilteredTemplates = async function ({
  ownerId,
  page = 1,
  limit = 10,
  search = '',
}) {
  const filter = { owner: ownerId };

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    this.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    this.countDocuments(filter),
  ]);

  return { items, total };
};

const Template = mongoose.model('Template', TemplateSchema);
export default Template;
