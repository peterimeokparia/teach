import mongoose from 'mongoose';
import logForTeachSchema from '../schema/logForTeachSchema.js';

const logForTeachModel = mongoose.model('logforteach', logForTeachSchema);

export default logForTeachModel;
