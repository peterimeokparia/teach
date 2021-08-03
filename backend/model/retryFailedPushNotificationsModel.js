import mongoose from 'mongoose';
import retryFailedNotificationsSchema from '../Schema/retryFailedNotificationsSchema.js';

const retryFailedPushNotificationsModel = mongoose.model('retryfailedonlinequestionspushnotificationsqueue', retryFailedNotificationsSchema);

export default retryFailedPushNotificationsModel;
