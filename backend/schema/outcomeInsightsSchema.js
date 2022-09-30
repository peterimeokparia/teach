import mongoose from 'mongoose';

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
    percentageNumberOfQuestionsPassedOutcome: { 
        type: Number, 
        required: false,
    },
    percentageNumberOfQuestionsFailedOutcome: { 
        type: Number, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: false  
    }
});

export default outcomeInsightsSchema;