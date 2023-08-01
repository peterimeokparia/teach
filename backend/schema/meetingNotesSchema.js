const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const meetingNotesSchema = new Schema ({
    meetingId: { 
        type: String, 
        required: true  
    },
    userId: { 
        type: String, 
        required: false  
    },
    title: { 
        type: String, 
        required: false  
    },
    markDownContent: { 
        type: String, 
        required: false  
    },
    notesUrl: { 
        type: String, 
        required: false  
    },
    videoUrl: { 
        type: String, 
        required: false  
    }
});


module.exports = meetingNotesSchema;