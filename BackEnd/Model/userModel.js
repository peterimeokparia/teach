import mongoose from 'mongoose';
import userSchema from '../Schema/userSchema.js';


const userModel = mongoose.model('users', userSchema);


export default userModel;
