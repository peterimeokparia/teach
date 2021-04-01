import mongoose from 'mongoose';
import timeLineSchema from '../Schema/timeLineSchema.js';

const timeLineModel = mongoose.model( 'timelines', timeLineSchema );

export default timeLineModel;
