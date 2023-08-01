const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema.js');

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
