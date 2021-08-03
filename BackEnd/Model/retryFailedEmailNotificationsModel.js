import mongoose from 'mongoose';
import retryFailedNotificationsSchema from '../schema/retryFailedNotificationsSchema.js';

const retryFailedEmailNotificationsModel = mongoose.model('retryfailedonlinequestionsemailnotificationsqueue', retryFailedNotificationsSchema);

export default retryFailedEmailNotificationsModel;
