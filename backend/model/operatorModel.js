import mongoose from 'mongoose';
import operatorSchema from '../Schema/operatorSchema.js';


const operatorModel = mongoose.model('operators', operatorSchema);


export default operatorModel;
