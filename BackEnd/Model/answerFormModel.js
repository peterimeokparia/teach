import mongoose from 'mongoose';
import answerFormSchema from '../Schema/answerFormSchema.js';

const answerFormModel = mongoose.model('answerforms', answerFormSchema);

export default answerFormModel;
