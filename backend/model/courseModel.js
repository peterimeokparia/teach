import mongoose from 'mongoose';
import courseSchema from './../schema/courseSchema.js';


const courseModel = mongoose.model('courses', courseSchema);


export default courseModel;
