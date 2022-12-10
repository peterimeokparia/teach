import mongoose from 'mongoose';
import outcomeInsightsSchema from '../schema/outcomeInsightsSchema.js';

const courseOutcomeInsightsModel = mongoose.model('courseoutcomeinsights', outcomeInsightsSchema);

export default courseOutcomeInsightsModel;