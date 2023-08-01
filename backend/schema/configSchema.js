const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const configSchema = new Schema ({
    privateKey: { 
        type: String, 
        required: false,
    },
    unharshedPrivateKey:{
        type: String, 
        required: false,
    },
    publicKey: { 
        type: String, 
        required: false,
    },
    encryptedData: { 
        type: String, 
        required: false,
    }
});

module.exports = configSchema;