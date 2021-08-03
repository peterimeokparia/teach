import mongoose from 'mongoose';
import classRoomSchema from '../Schema/classRoomSchema.js';


const classRoomModel = mongoose.model('classrooms', classRoomSchema);


export default classRoomModel;
