import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const sessionSchema = new Schema ({
        courseId: { 
            type: String, 
            required: false  
        },
        typeOfSession: { 
            type: String, 
            required: false
        },
        numberOfSessions: { 
            type: Number, 
            required: false  
        },
        totalNumberOfSessions: { 
            type: Number, 
            required: false  
        },
        userId: { 
            type: String, 
            required: false  
        },
        tutorId: { 
            type: String,  
            required: false  
        },
        startDate: { 
            type: Date, 
            required: false,
            default: Date.now  
        },
        endDate: { 
             type: Date, 
             required: false,
             default: Date.now  
        },
        status: { 
            type: Boolean, 
            required: false  
       },
       autoRenew: { 
            type: Boolean, 
            required: false  
      },
      autoRenewDates: {
            type: Array,
            required: false
      }
});


export default sessionSchema;