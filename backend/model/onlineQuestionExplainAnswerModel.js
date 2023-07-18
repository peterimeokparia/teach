import mongoose from 'mongoose';
import onlineQuestionSchema from '../schema/onlineQuestionSchema.js';

const onlineQuestionExplainAnswerModel = mongoose.model('onlinequestionexplainanswer', onlineQuestionSchema );

export default onlineQuestionExplainAnswerModel;
