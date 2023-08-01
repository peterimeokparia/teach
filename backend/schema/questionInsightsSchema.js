const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const questionInsightsSchema = new Schema ({
    formType: { 
        type: String, 
        required: false,
    },
    courseId: { 
        type: String, 
        required: false,
    },
    lessonId: { 
        type: String, 
        required: false,
    },
    questionId: { 
        type: String, 
        required: false,
    },
    formName: { 
        type: String, 
        required: false,
    },
    userId: { 
        type: String, 
        required: false,
    },
    formUuId: { 
        type: String, 
        required: false,
    },
    answerId: { 
        type: String, 
        required: false,
    },
    outcomeId: { 
        type: String, 
        required: false,
    },
    totalPointsReceived: { 
        type: Number, 
        required: false,
    },
    passed: { 
        type: Boolean, 
        required: false,
    },
    fail: { 
        type: Boolean, 
        required: false,
    },
    unanswered: { 
        type: Boolean, 
        required: false,
    },
    totalNumberOfSubmittedAssignments: { 
        type: Number, 
        required: false,
    },
    totalNumberOfStudents: { 
        type: Number, 
        required: false,
    },
    numberOfStudentsAttemptedQuestion: { 
        type: Number, 
        required: false,
    },
    numberOfStudentsPassedQuestion: { 
        type: Number, 
        required: false,
    },
    numberOfStudentsFailedQuestion: { 
        type: Number, 
        required: false,
    }, 
    numberOfStudentsUnAttemptedQuestion: {
        type: Number, 
        required: false,
    },
    passPercentRate: { 
        type: Number, 
        required: false,
    },
    failurePercentRate: { 
        type: Number, 
        required: false,
    },
    unAttemptedPercentRate: { 
        type: Number, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: false  
    }
});

module.exports = questionInsightsSchema;