import mongoose from 'mongoose';
import attendanceSchema from '../Schema/attendanceSchema.js';


const attendance = mongoose.model('attendances', attendanceSchema);


export default attendance;
