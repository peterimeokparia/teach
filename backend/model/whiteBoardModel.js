import mongoose from 'mongoose';
import whiteBoardSchema from '../schema/whiteBoardSchema.js';

const whiteBoardModel = mongoose.model('whiteboards', whiteBoardSchema);

export default whiteBoardModel;
