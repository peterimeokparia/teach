import mongoose from 'mongoose';
import onlineSurveySchema from '../schema/onlineSurveySchema.js';

const onlineSurveyModel = mongoose.model('onlinesurveys', onlineSurveySchema);

export default onlineSurveyModel;
