import mongoose from 'mongoose';
import examSchema from '../schema/examSchema.js';


const examModel = mongoose.model('exams', examSchema);


export default examModel;
