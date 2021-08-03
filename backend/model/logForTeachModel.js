import mongoose from 'mongoose';
import logForTeachSchema from '../Schema/logForTeachSchema.js';

const logForTeachModel = mongoose.model('logforteach', logForTeachSchema);

export default logForTeachModel;
