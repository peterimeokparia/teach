import mongoose from 'mongoose';
import lessonSchema from '../Schema/lessonSchema.js';


const lessonModel = mongoose.model('lessons', lessonSchema);


export default lessonModel;
