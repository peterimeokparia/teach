import mongoose from 'mongoose';
import fullTextSearchSchema from '../schema/fullTextSearchSchema.js';

const fullTextSearchModel = mongoose.model('fulltextsearch', fullTextSearchSchema);

export default fullTextSearchModel;
