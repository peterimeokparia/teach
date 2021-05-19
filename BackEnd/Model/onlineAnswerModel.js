import mongoose from 'mongoose';
import onlineQuestionAnswerSchema from '../Schema/onlineQuestionAnswerSchema.js';

const onlineAnswerModel = mongoose.model('onlineanswers', onlineQuestionAnswerSchema);

export default onlineAnswerModel;
