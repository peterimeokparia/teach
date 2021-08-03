import mongoose from 'mongoose';
import assignmentSchema from '../schema/assignmentSchema.js';


const assignmentModel = mongoose.model('assignments', assignmentSchema);


export default assignmentModel;
