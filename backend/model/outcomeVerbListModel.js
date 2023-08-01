const mongoose = require('mongoose');
const outcomeVerbListSchema = require('../schema/outcomeVerbListSchema.js');

const outcomeVerbListModel = mongoose.model('outcomeverblist', outcomeVerbListSchema);

module.exports = outcomeVerbListModel;
