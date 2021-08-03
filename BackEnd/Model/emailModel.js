import mongoose from 'mongoose';
import emailSchema from '../schema/emailSchema.js';


const emailModel = mongoose.model('emails', emailSchema);


export default emailModel;
