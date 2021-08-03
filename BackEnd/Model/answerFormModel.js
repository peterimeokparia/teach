import mongoose from 'mongoose';
import answerFormSchema from '../schema/answerFormSchema.js';

const answerFormModel = mongoose.model('answerforms', answerFormSchema);

export default answerFormModel;
