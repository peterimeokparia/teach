import mongoose from 'mongoose';
import emailSchema from '../Schema/emailSchema.js';


const emailModel = mongoose.model('emails', emailSchema);


export default emailModel;
