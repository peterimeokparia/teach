import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const classRoomSchema = new Schema ({
    name: { 
        type: String, 
        required: true,
    },
    description: { 
        type: String, 
        required: false,
    },
    users: {
        type: Array,
        require: false
    },
    createdBy: { 
          type: String, 
          required: true,
    },
    operatorId: { 
        type: String, 
        required: true  
    }
});


export default classRoomSchema;