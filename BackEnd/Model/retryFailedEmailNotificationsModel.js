import mongoose from 'mongoose';
import retryFailedNotificationsSchema from '../Schema/retryFailedNotificationsSchema.js';

const retryFailedEmailNotificationsModel = mongoose.model('retryfailedonlinequestionsemailnotificationsqueue', retryFailedNotificationsSchema);

export default retryFailedEmailNotificationsModel;
