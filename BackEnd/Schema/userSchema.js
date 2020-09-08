import mongoose from 'mongoose';
// import Email from 'mongoose-type-email';

const Schema = mongoose.Schema; 

const userSchema = new Schema ({
    firstname: { 
        type: String, 
        required: true  
    },
    email: { 
        type: String, 
        required: true, 
        index: { unique: true 
        } 
    },
    password: { 
        type: String, 
        required: true  
    },
    token: { 
        type: String, 
        required: true  
    },
    role: { 
        type: String, 
        required: true  
    },
    courses: {
        type: Array,
        required: false
    },
    cart: {
        type: Array,
        required: false
    },
    cartTotal: {
        type: Number,
        required: false
    },
    paymentStatus: { 
        type: String, 
        required: false  
    },
    purchaseHistoryTimeStamp: { 
        type: String, 
        required: false  
    },
    inviteeSessionUrl: { 
         type: String, 
         required: false  
    },
    lessonInProgress: { 
        type: Boolean, 
        required: false  
   },
   nameOfLessonInProgress: {
        type: String,
        required: false
    },
    loginCount: {
        type: Number,
        required: true
    },
    meetingId: {
        type: String,
        required: false
    }
});


export default userSchema;