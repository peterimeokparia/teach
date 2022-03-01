import mongoose from 'mongoose';
import classGradeSchema from '../schema/classGradeSchema.js';

const classGradeModel = mongoose.model('classgrades', classGradeSchema);

export default classGradeModel;
