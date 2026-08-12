// PROCESS MODEL

import mongoose, { Schema } from 'mongoose';

// *************************************************************************************************
// Document
const NotificationSchema = new mongoose.Schema(
  {
    to: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    from: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['sent', 'received'],
      default: 'sent',
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// *************************************************************************************************
// Coumpound indexes
// NotificationSchema.index({ to: 1, _id: 1 });

// *************************************************************************************************
// Methods
NotificationSchema.statics.findNotification = async function (id) {
  const notificationsModel = this;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('E1304');
  const notification = await notificationsModel.findOne({
    _id: id,
  });
  if (!notification) throw new Error('E1305');
  return notification;
};

// NotificationSchema.statics.getNotifications = async function (query) {
//   if (!query) throw new Error('E1306');
//   const notificationsModel = this;
//   const notifications = await notificationsModel.find(query).sort({ createdAt: -1 });
//   if (!notifications) throw new Error('E1307');
//   return notifications;
// };
NotificationSchema.statics.getNotifications = async function (pagination, filter) {
  if (!pagination || !filter) throw new Error('E1306');
  const notificationsModel = this;
  const query = {};
  if (filter.to) query.to = filter.to;
  if (pagination.cursor && mongoose.Types.ObjectId.isValid(pagination.cursor))
    query['_id'] = { $lt: pagination.cursor };
  const notifications = await notificationsModel
    .find(query)
    .sort({ _id: -1 })
    .limit(pagination.limit)
    .lean();
  if (!notifications) throw new Error('E1307');
  return notifications;
};

NotificationSchema.statics.acknowledgeNotification = async function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('E1312');
  const notificationsModel = this;
  const notification = await notificationsModel.findOneAndUpdate(
    { _id: id },
    { $set: { status: 'received' } },
    { new: true }
  );
  if (!notification) throw new Error('E1313');
  return notification;
};

NotificationSchema.methods.createNotification = async function (data) {
  if (!data) throw new Error('E1308');

  const notificationsModel = this;
  const { from, to, subject, message } = data;

  if (!mongoose.Types.ObjectId.isValid(from)) throw new Error('E1309');
  if (!mongoose.Types.ObjectId.isValid(to)) throw new Error('E1310');
  if (!subject || !message) throw new Error('E1311');

  // Creation
  notificationsModel.from = from;
  notificationsModel.to = to;
  notificationsModel.subject = subject;
  notificationsModel.message = message;

  const createdNotification = await notificationsModel.save();
  if (!createdNotification) throw new Error('E1312');
  return createdNotification;
};

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
