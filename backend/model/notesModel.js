import mongoose from 'mongoose';
import notesSchema from '../schema/notesSchema.js';

const notesModel = mongoose.model('notes', notesSchema);

export default notesModel;
