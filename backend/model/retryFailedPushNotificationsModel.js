const mongoose = require('mongoose');
const retryFailedNotificationsSchema = require('../schema/retryFailedNotificationsSchema.js');

const retryFailedPushNotificationsModel = mongoose.model('retryfailedonlinequestionspushnotificationsqueue', retryFailedNotificationsSchema);

module.exports = retryFailedPushNotificationsModel;
