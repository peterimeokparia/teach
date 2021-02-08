import mongoose from 'mongoose';
import examSchema from '../Schema/examSchema.js';


const examModel = mongoose.model('exams', examSchema);


export default examModel;
