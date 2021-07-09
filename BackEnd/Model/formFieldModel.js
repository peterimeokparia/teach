import mongoose from 'mongoose';
import formFieldSchema from '../Schema/formFieldSchema.js';

const formFieldModel = mongoose.model('formfields', formFieldSchema);

export default formFieldModel;
