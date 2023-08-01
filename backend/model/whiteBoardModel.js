const mongoose = require('mongoose');
const whiteBoardSchema = require('../schema/whiteBoardSchema.js');

const whiteBoardModel = mongoose.model('whiteboards', whiteBoardSchema);

module.exports = whiteBoardModel;
