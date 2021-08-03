import mongoose from 'mongoose';
import timeLineSchema from '../schema/timeLineSchema.js';

const timeLineModel = mongoose.model( 'timelines', timeLineSchema );

export default timeLineModel;
