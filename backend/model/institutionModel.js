import mongoose from 'mongoose';
import institutionSchema from '../schema/institutionSchema.js';

const institutionModel = mongoose.model('institutions', institutionSchema);

export default institutionModel;
