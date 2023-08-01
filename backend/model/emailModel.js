const mongoose = require('mongoose');
const emailSchema = require('../schema/emailSchema.js');


const emailModel = mongoose.model('emails', emailSchema);


module.exports = emailModel;
