import mongoose from 'mongoose';
import questionSchema from '../schema/questionSchema.js';


const questionModel = mongoose.model('questions', questionSchema);


export default questionModel;
