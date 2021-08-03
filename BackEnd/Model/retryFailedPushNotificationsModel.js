import mongoose from 'mongoose';
import retryFailedNotificationsSchema from '../schema/retryFailedNotificationsSchema.js';

const retryFailedPushNotificationsModel = mongoose.model('retryfailedonlinequestionspushnotificationsqueue', retryFailedNotificationsSchema);

export default retryFailedPushNotificationsModel;
