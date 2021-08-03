import mongoose from 'mongoose';
import calendarSchema from '../Schema/calendarSchema.js';

const calendarModel = mongoose.model('calendar', calendarSchema);

export default calendarModel;
