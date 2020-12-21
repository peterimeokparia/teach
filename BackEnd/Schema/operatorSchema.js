import mongoose from 'mongoose';
// import Email from 'mongoose-type-email';


const Schema = mongoose.Schema; 


const operatorSchema = new Schema ({
    businessName: { 
        type: String, 
        required: true  
    },
    firstName: { 
        type: String, 
        required: true  
    },
    lastName: { 
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
    phone: { 
        type: String, 
        required: true  
    },
    timeJoined: { 
        type: Date, 
        required: false,
        default: Date.now  
    }
});


export default operatorSchema;