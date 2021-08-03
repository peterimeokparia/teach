import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const notificationSchema = new Schema ({
    userId: { 
        type: String, 
        required: true,
        index: { unique: false 
        }   
    },
    subscriptions: {
        type: Array, 
        required: true  
    },
    messages: {
        type: Array, 
        required: false 
    },
    operatorId: { 
        type: String, 
        required: true,
    }
});


export default notificationSchema;