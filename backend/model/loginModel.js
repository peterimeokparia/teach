const mongoose = require('mongoose');
const loginSchema = require('../schema/loginSchema.js');

const loginModel = mongoose.model('logins', loginSchema);

module.exports = loginModel;
