import mongoose from 'mongoose';
import outcomeInsightsSchema from '../schema/outcomeInsightsSchema.js';

const outcomeInsightsModel = mongoose.model('outcomeinsights', outcomeInsightsSchema);

export default outcomeInsightsModel; 
