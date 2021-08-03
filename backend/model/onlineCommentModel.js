import mongoose from 'mongoose';
import onlineQuestionAnswersCommentsSchema from '../schema/onlineQuestionAnswersCommentsSchema.js';

const onlineCommentModel = mongoose.model('onlinecomments', onlineQuestionAnswersCommentsSchema);

export default onlineCommentModel;
