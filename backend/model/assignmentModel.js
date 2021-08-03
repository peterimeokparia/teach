import mongoose from 'mongoose';
import assignmentSchema from '../Schema/assignmentSchema.js';


const assignmentModel = mongoose.model('assignments', assignmentSchema);


export default assignmentModel;
