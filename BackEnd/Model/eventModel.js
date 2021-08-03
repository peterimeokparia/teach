import mongoose from 'mongoose';
import eventSchema from '../schema/eventSchema.js';

const eventModel = mongoose.model('event', eventSchema);

export default eventModel;
