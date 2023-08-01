const mongoose = require('mongoose');
const notificationSchema = require('../schema/notificationSchema.js');

const notificationModel = mongoose.model('notifications', notificationSchema);

module.exports = notificationModel;