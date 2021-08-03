import mongoose from 'mongoose';
import questionFormSchema from '../schema/questionFormSchema.js';

const questionFormModel = mongoose.model('questionforms', questionFormSchema);

export default questionFormModel;
