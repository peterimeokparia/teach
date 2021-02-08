import mongoose from 'mongoose';
import questionSchema from '../Schema/questionSchema.js';


const questionModel = mongoose.model('questions', questionSchema);


export default questionModel;
