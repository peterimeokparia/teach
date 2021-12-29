import mongoose from 'mongoose';
import loginSchema from '../schema/loginSchema.js';

const loginModel = mongoose.model('logins', loginSchema);

export default loginModel;
