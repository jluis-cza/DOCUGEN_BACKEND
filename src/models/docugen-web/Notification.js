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
      index: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// *************************************************************************************************
// Methods
NotificationSchema.statics.findNotification = async function (id) {
  const notificationsModel = this;
  if (!id) throw new Error('E1304');
  const notification = await notificationsModel.findOne({
    _id: id,
  });
  if (!notification) throw new Error('E1305');
  return notification;
};

NotificationSchema.statics.getNotifications = async function (query) {
  if (!query) throw new Error('E1306');
  const notificationsModel = this;
  const notifications = await notificationsModel.find(query).sort({ createdAt: -1 });
  if (!notifications) throw new Error('E1307');
  return notifications;
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
