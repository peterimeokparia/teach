import mongoose from 'mongoose';
import gradeSchema from '../Schema/gradeSchema.js';


const gradeModel = mongoose.model('grades', gradeSchema);


export default gradeModel;
