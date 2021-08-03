import mongoose from 'mongoose';
import gradeSchema from '../schema/gradeSchema.js';


const gradeModel = mongoose.model('grades', gradeSchema);


export default gradeModel;
