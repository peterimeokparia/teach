import mongoose from 'mongoose';
import lessonSchema from '../schema/lessonSchema.js';


const lessonModel = mongoose.model('lessons', lessonSchema);


export default lessonModel;
