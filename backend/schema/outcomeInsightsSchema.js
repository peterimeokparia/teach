const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const outcomeInsightsSchema = new Schema ({
    formType: { 
        type: String, 
        required: false,
    },
    formName: { 
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
    outcomeId: { 
        type: String, 
        required: false,
    },
    maxScore: { 
        type: Number, 
        required: false,
    },
    minScore: { 
        type: Number, 
        required: false,
    },
    avgScore: { 
        type: Number, 
        required: false,
    },
    numberOfQuestionsInOutcome: { 
        type: Number, 
        required: false,
    },
    numberOfQuestionsPassedOutcome: { 
        type: Number, 
        required: false,
    },
    numberOfQuestionsFailedOutcome: { 
        type: Number, 
        required: false,
    },
    numberOfUnAttemptedQuestionsInOutcome: { 
        type: Number, 
        required: false,
    },
    totalNumberOfAttemptedFailedQuestions: { 
        type: Number, 
        required: false,
    },
    percentageNumberOfQuestionsPassedOutcome: { 
        type: Number, 
        required: false,
    },
    percentageNumberOfQuestionsFailedOutcome: { 
        type: Number, 
        required: false,
    },
    percentageNumberOfUnAttemptedQuestionsInFailureRate: { 
        type: Number, 
        required: false,
    },
    listOfStudentsFailedQuestionsInOutcome: { 
        type: Array, 
        required: false,
    },
    listOfQuestionsFailed: { 
        type: Array, 
        required: false,
    },
    listOfStudentsPassedQuestionsInOutcome: { 
        type: Array, 
        required: false,
    },
    listOfQuestionsPassed: { 
        type: Array, 
        required: false,
    },
    totalNumberOfOutcomeQuestionsInCourse: { 
        type: Number, 
        required: false,
    },
    totalNumberOfQuestionsPassedOutcomeInCourse: { 
        type: Number, 
        required: false,
    },
    totalNumberOfQuestionsFailedOutcomeInCourse: { 
        type: Number, 
        required: false,
    },
    totalNumberOfAttemptedFailedOutcomeQuestionsInCourse: { 
        type: Number, 
        required: false,
    },
    totalNumberOfUnAttemptedOutcomeQuestionsInCourse: { 
        type: Number, 
        required: false,
    },
    percentageNumberOfQuestionsPassedOutcomeInCourse: { 
        type: Number, 
        required: false,
    },
    percentageNumberOfQuestionsFailedOutcomeInCourse: { 
        type: Number, 
        required: false,
    },
    percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse: { 
        type: Number, 
        required: false,
    },
    userId: { 
        type: String, 
        required: false  
    },
    operatorId: { 
        type: String, 
        required: false  
    }
});

module.exports = outcomeInsightsSchema;