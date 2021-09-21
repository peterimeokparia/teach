import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const meetingSchema = new Schema ({
    operatorId: { 
        type: String, 
        required: false  
    },
    userId: { 
        type: String, 
        required: false  
    },
    courseId: { 
        type: String, 
        required: false
    },
    lessonId: { 
        type: String, 
        required: false  
    },
    sessions: { 
        type: Array, 
        required: false  
    },
    courseTitle: { 
        type: String, 
        required: false  
    },
    lessonTitle: { 
        type: String, 
        required: false  
    },
    invitees: {
        type: Array,
        required: false
    },
    meetingUrl: { 
        type: String, 
        required: false  
    },
    timeStarted: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    timeEnded: { 
         type: Date, 
         required: false,
         default: Date.now  
    },
    usersWhoJoinedTheMeeting: { 
        type: Array, 
        required: false  
    },
});


export default meetingSchema;