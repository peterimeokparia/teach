const mongoose = require('mongoose');
const configSchema = require('../schema/configSchema.js');

const configModel = mongoose.model('configs', configSchema);

module.exports = configModel;
