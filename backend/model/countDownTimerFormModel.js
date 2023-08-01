const mongoose = require('mongoose');
const countDownTimerFormSchema = require('../schema/countDownTimerFormSchema.js');

const countDownTimerFormModel = mongoose.model('testtimers', countDownTimerFormSchema);

module.exports = countDownTimerFormModel;
