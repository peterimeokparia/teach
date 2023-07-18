import mongoose from 'mongoose';
import insightsSchema from '../schema/insightsSchema.js';

const insightsModel = mongoose.model('insights', insightsSchema);

export default insightsModel;
