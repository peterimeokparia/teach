import mongoose from 'mongoose';
import eventSchema from '../Schema/eventSchema.js';

const eventModel = mongoose.model('event', eventSchema);

export default eventModel;
