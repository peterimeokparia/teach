import mongoose from 'mongoose';
import onlineQuestionAnswerSchema from '../schema/onlineQuestionAnswerSchema.js';

const onlineAnswerModel = mongoose.model('onlineanswers', onlineQuestionAnswerSchema);

export default onlineAnswerModel;
