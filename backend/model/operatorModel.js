const mongoose = require('mongoose');
const operatorSchema = require('../schema/operatorSchema.js');


const operatorModel = mongoose.model('operators', operatorSchema);


module.exports = operatorModel;
