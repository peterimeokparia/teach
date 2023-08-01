const mongoose = require('mongoose');
const retryFailedNotificationsSchema = require('../schema/retryFailedNotificationsSchema.js');

const retryFailedEmailNotificationsModel = mongoose.model('retryfailedonlinequestionsemailnotificationsqueue', retryFailedNotificationsSchema);

module.exports = retryFailedEmailNotificationsModel;
