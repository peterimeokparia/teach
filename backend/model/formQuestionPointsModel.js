import mongoose from 'mongoose';
import formQuestionPointsSchema from '../schema/formQuestionPointsSchema.js';

const formQuestionPointsModel = mongoose.model('formquestionpoints', formQuestionPointsSchema);

export default formQuestionPointsModel;
