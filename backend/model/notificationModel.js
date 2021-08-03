import mongoose from 'mongoose';
import notificationSchema from '../schema/notificationSchema.js';

const notificationModel = mongoose.model('notifications', notificationSchema);

export default notificationModel;