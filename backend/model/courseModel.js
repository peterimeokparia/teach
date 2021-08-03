import mongoose from 'mongoose';
import courseSchema from './../Schema/courseSchema.js';


const courseModel = mongoose.model('courses', courseSchema);


export default courseModel;
