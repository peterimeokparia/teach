import mongoose from 'mongoose';
import onlineQuestionSchema from '../schema/onlineQuestionSchema.js';

const onlineQuestionModel = mongoose.model('onlinequestions', onlineQuestionSchema);

export default onlineQuestionModel;
