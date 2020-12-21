import mongoose from 'mongoose';
import sessionSchema from '../Schema/sessionSchema.js';


const sessionModel = mongoose.model('sessions', sessionSchema);


export default sessionModel;
