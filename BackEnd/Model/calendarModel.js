import mongoose from 'mongoose';
import calendarSchema from '../schema/calendarSchema.js';

const calendarModel = mongoose.model('calendar', calendarSchema);

export default calendarModel;
