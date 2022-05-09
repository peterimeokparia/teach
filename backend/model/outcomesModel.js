import mongoose from 'mongoose';
import outcomesSchema from '../schema/outcomesSchema.js';

const outcomesModel = mongoose.model('outcomes', outcomesSchema);

export default outcomesModel;
