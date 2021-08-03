import mongoose from 'mongoose';
import formFieldSchema from '../schema/formFieldSchema.js';

const formFieldModel = mongoose.model('formfields', formFieldSchema);

export default formFieldModel;
