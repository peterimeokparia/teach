import mongoose from 'mongoose';
import attendanceSchema from '../schema/attendanceSchema.js';


const attendance = mongoose.model('attendances', attendanceSchema);


export default attendance;
