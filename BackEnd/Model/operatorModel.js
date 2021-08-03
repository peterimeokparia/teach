import mongoose from 'mongoose';
import operatorSchema from '../schema/operatorSchema.js';


const operatorModel = mongoose.model('operators', operatorSchema);


export default operatorModel;
