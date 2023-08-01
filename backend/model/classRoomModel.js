const mongoose = require('mongoose');
const classRoomSchema = require('../schema/classRoomSchema.js');


const classRoomModel = mongoose.model('classrooms', classRoomSchema);


module.exports = classRoomModel;
