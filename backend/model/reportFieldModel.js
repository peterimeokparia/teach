import mongoose from 'mongoose';
import reportFieldSchema from '../schema/reportFieldSchema.js';

const reportFieldModel = mongoose.model('reportfield', reportFieldSchema);

export default reportFieldModel;
