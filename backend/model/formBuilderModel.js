import mongoose from 'mongoose';
import formBuilderSchema from '../schema/formBuilderSchema.js';

const formBuilderModel = mongoose.model('formbuilder', formBuilderSchema);

export default formBuilderModel;
