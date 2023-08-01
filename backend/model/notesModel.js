const mongoose = require('mongoose');
const notesSchema = require('../schema/notesSchema.js');

const notesModel = mongoose.model('notes', notesSchema);

module.exports = notesModel;
