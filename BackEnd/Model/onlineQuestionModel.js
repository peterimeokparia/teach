import mongoose from 'mongoose';
import onlineQuestionSchema from '../Schema/onlineQuestionSchema.js';

const onlineQuestionModel = mongoose.model('onlinequestions', onlineQuestionSchema);

export default onlineQuestionModel;