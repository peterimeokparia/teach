const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const retryFailedNotificationsSchema = new Schema ({ 
        notificationType: { 
            type: String, 
            required: false,
        },
        notificationCode: { 
            type: String, 
            required: false,
        },
        sendFailureTime: { 
            type: Date, 
            required: false,
            default: Date.now  
        },
        retryTime: { 
            type: Date, 
            required: false,
            default: Date.now  
        },
        retryCount: { 
            type: Number, 
            required: false,
        },
        errorStatusCode: {
            type: Number, 
            required: false,
        },
        error: { // Stringify & Parse 
            type: String, 
            required: false,
        }, 
        failedNotificationObject: { // Stringify & Parse 
            type: String, 
            required: false,
        }, 
        userId: { 
            type: String, 
            required: false,
        },
        operatorId: { 
            type: String, 
            required: false  
        }
});

module.exports = retryFailedNotificationsSchema;

