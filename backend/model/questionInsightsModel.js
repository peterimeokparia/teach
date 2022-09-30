import mongoose from 'mongoose';
import questionInsightsSchema from '../schema/questionInsightsSchema.js';

const questionInsightsModel = mongoose.model('questioninsights', questionInsightsSchema);

export default questionInsightsModel;
