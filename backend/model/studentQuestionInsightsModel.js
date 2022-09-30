import mongoose from 'mongoose';
import questionInsightsSchema from '../schema/questionInsightsSchema.js';

const studentQuestionInsightsModel = mongoose.model('studentquestioninsights', questionInsightsSchema);

export default studentQuestionInsightsModel;
