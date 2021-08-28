import mongoose from 'mongoose';
import configSchema from '../schema/configSchema.js';

const configModel = mongoose.model('configs', configSchema);

export default configModel;
