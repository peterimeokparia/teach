import mongoose from 'mongoose';
import sessionSchema from '../schema/sessionSchema.js';


const sessionModel = mongoose.model('sessions', sessionSchema);


export default sessionModel;
