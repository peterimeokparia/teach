import mongoose from 'mongoose';
import onlineQuestionAnswersCommentsSchema from '../Schema/onlineQuestionAnswersCommentsSchema.js';

const onlineCommentModel = mongoose.model('onlinecomments', onlineQuestionAnswersCommentsSchema);

export default onlineCommentModel;
