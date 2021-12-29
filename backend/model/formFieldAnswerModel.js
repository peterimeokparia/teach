import mongoose from 'mongoose';
import formFieldSchema from '../schema/formFieldSchema.js';

const formFieldAnswerModel = mongoose.model('formfieldanswers', formFieldSchema);

export default formFieldAnswerModel;
