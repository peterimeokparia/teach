import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const onlineQuestionDataReportSchema = new Schema ({
    courseId: { 
        type: String, 
        required: false,
    },
    courseTitle: {   // remove this ltr
        type: String, 
        required: false,
    },
    questionId: { 
        type: String, 
        required: false,
    },
    questionTitle: {  // remove this ltr
        type: String, 
        required: false,
    }, 
    questionRequestedBy: { 
        type: String, 
        required: false,
    },
    requestersSchoolName: { 
        type: String, 
        required: false,
    },
    requestersGrade: { 
        type: String, 
        required: false,
    },
    satisifactoryAnswer: { 
        type: Boolean, 
        required: false,
    },
    questionAnsweredBy: { 
        type: String, 
        required: false,
    },
    requesterSoughtFollowUpHelp: { 
        type: Boolean, 
        required: false,
    },
    numberOfTimesQuestionWasViewed: { 
        type: Number, 
        required: false,
    },
    numberOfTimesQuestionWasSaved: { 
        type: Number, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: true  
    }
});


export default onlineQuestionDataReportSchema;