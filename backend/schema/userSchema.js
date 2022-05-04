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
   userIsVerified: {
    type: Boolean, 
    required: false  
   },
   userIsValidated: { 
    type: Boolean, 
    required: false  
   },
   nameOfLessonInProgress: {
        type: String,
        required: false
    },
    lesson: { 
        type: String, 
        required: false  
    },
    course: { 
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
    },
    meetings: {
        type: Array,
        required: false
    },
    sessions: {
        type: Array,
        require: false
    },
    markDownContent: { 
        type: String, 
        required: false  
    },
    avatarUrl: { 
        type: String, 
        required: false  
    },
    files: {
        type: Array,
        required: false
    },
    classRooms: {
        type: Array,
        required: false
    },
    operatorId: { 
        type: String, 
        required: true  
    },
    timeMeetingStarted: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    timeMeetingEnded: { 
         type: Date, 
         required: false,
         default: Date.now  
    },
    calendarEvents: {
        type: Array,
        required: false
    },
    assignedTutors: {
        type: Array,
        required: false
    },
    assignedStudents: {
        type: Array,
        required: false
    }
});


export default userSchema;