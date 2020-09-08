import mongoose from 'mongoose';
import meetingSchema from '../Schema/meetingSchema.js';


const meetingModel = mongoose.model('meetings', meetingSchema);


export default meetingModel;
