const mongoose = require('mongoose');
const sessionSchema = require('../schema/sessionSchema.js');


const sessionModel = mongoose.model('sessions', sessionSchema);


module.exports = sessionModel;
