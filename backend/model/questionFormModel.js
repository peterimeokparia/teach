import mongoose from 'mongoose';
import questionFormSchema from '../Schema/questionFormSchema.js';

const questionFormModel = mongoose.model('questionforms', questionFormSchema);

export default questionFormModel;
