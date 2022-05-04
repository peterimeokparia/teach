import mongoose from 'mongoose';
import formFieldSchema from '../schema/formFieldSchema.js';

const mathScienceFormFieldModel = mongoose.model('mathscienceformfields', formFieldSchema);

export default mathScienceFormFieldModel;
