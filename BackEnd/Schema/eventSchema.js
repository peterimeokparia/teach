import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const eventSchema = new Schema ({
    calendarId: { 
        type: String, 
        required: false  
    },
    userId: {
        type: String, 
        required: false  
    },
    color: {
        type: String, 
        required: false  
    },
    event: {
        id: {
            type: String, 
            required: false  
        },
        title: {
            type: String, 
            required: false  
        },
        allDay: {
            type: Boolean, 
            required: false 
        },
        start: {
            type: Date, 
            required: false,
            default: Date.now  
        },
        end: {
            type: Date, 
            required: false,
            default: Date.now  
        },
        recurringEvent: {
            type: Boolean, 
            required: false 
        },
        url: {
            type: String, 
            required: false  
        },
        classNames: {
            type: Array,
            required: false
        },
        color: {
            type: String, 
            required: false  
        },
        backgroundColor: {
            type: String, 
            required: false  
        },
        borderColor: {
            type: String, 
            required: false  
        },
        textColor: {
            type: String, 
            required: false  
        },
        rrule: {
            freq: {
                type: String, 
                required: false,
                default: ''   
            },
            interval: {
                type: Number, 
                required: false  
            },
            byweekday : {
                type: Array,
                required: false
            },
            dtstart: {
                type: Date, 
                required: false,
                default: Date.now  
            },
            until: {
                type: Date, 
                required: false,
                default: Date.now  
            }
        },
        duration: {
            type: Number, 
            required: false
        }
    },
    location: {
        type: String, 
        required: false 
    },
    schedulingData: {
        type: Array,
        required: false
    },
    consultation: {
        firstName: {
            type: String, 
            required: false  
        }, 
        lastName: {
            type: String, 
            required: false  
        }, 
        studentsName: {
            type: String, 
            required: false  
        }, 
        email: {
            type: String, 
            required: false  
        }, 
        phone: {
            type: Number, 
            required: false  
        },
        coursesInterestedIn: {
            type: Array,
            required: false
        }
    },
    timeLineItems: [{
        id: {
            type: String, 
            required: false  
        },
        group: {
            type: String, 
            required: false  
        },
        title: {
            type: String, 
            required: false  
        },
        start_time: {
            type: Date, 
            required: false,
            default: Date.now  
        },
        end_time: {
            type: Date, 
            required: false,
            default: Date.now  
        },
        recurringEvent: {
            type: Boolean, 
            required: false 
        },
        color: {
            type: String,
            required: false
        }
    }],
    calendarEventType: { 
        type: String, 
        required: false  
    },
    operatorId: { 
        type: String, 
        required: false  
    }
});

export default eventSchema;