import mongoose from 'mongoose';
import notificationSchema from '../Schema/notificationSchema.js';


const notificationModel = mongoose.model('notifications', notificationSchema);


export default notificationModel;