import mongoose from 'mongoose';
import equationSchema from './../schema/equationSchema.js';


const equationModel = mongoose.model( 'equations', equationSchema );


export default equationModel;
