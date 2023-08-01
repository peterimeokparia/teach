const mongoose = require('mongoose');
const equationSchema = require('../schema/equationSchema.js');


const equationModel = mongoose.model( 'equations', equationSchema );


module.exports = equationModel;
