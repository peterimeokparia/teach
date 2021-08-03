import mongoose from 'mongoose';
import classRoomSchema from '../schema/classRoomSchema.js';


const classRoomModel = mongoose.model('classrooms', classRoomSchema);


export default classRoomModel;
