import mongoose from 'mongoose';
import countDownTimerFormSchema from '../schema/countDownTimerFormSchema.js';

const countDownTimerFormModel = mongoose.model('testtimers', countDownTimerFormSchema);

export default countDownTimerFormModel;
