import mongoose from 'mongoose';
import meetingSchema from '../schema/meetingSchema.js';


const meetingModel = mongoose.model('meetings', meetingSchema);


export default meetingModel;
