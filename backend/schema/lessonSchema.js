import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const lessonSchema = new Schema ({
    title: { 
        type: String,
        required: true,
    },
    introduction: { 
        type: String,
        required: true,
    },
    courseId: { 
        type: String, 
        required: true  
    },
    userId: {
        type: String, 
        required: true  
    },
    markDown: { 
        type: String, 
        required: false  
    },
    videoUrl: { 
         type: String, 
         required: false  
    },
    files: {
        type: Array,
        required: false
    },
    lessonDate: {
        type: Date, 
        required: false,
        default: Date.now  
    }
});

export default lessonSchema;