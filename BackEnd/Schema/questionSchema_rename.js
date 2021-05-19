import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

//Build new exam from existing set of questions

const questionSchema_rename = new Schema ({

    questionNumber:{
        type: Number,
        required: false,
    },
    id:{
        type: Number,
        required: false,
    },
    name: { 
        type: String, 
        required: false,
    },
    questionCreatedOnDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    markDownContent: { 
        type: String, 
        required: false,
    },
    value: { 
        type: String, 
        required: false,
    },
    multipleChoiceQuestionAnswerKey: { 
        type: String, 
        required: false,
    },
    multipleChoiceQuestionStudentAnswer: { 
        type: String, 
        required: false,
    },
    multipleChoiceQuestionStudentAnswerInputValue: { 
        type: String, 
        required: false,
    },
    multipleChoiceQuestionAnswerKeyInputValue: { 
        type: String, 
        required: false,
    },
    multipleChoiceQuestionExplanationAnswer: { 
        type: String, 
        required: false,
    },
    explanationQuestionAnswerKey: { 
        type: String, 
        required: false,
    },
    explanationQuestionAnswer: { 
        type: String, 
        required: false,
    },
    courseId: { 
        type: String, 
        required: false,
    },
    markDownEditorFormInputFields: [{ 
        questionNumber:{
            type: Number,
            required: false,
        },
        id:{
            type: Number,
            required: false,
        },
        name: { 
            type: String, 
            required: false,
        },
        editorContentType: { 
            type: String, 
            required: false,
        },
        courseId: { 
            type: String, 
            required: false,
        },
        type: { 
            type: String, 
            required: false,
        },
        value: { 
            type: String, 
            required: false,
        },
        videoUrl: { 
            type: String, 
            required: false,
        },
        questionAnsweredOnDateTime: { 
            type: Date, 
            required: false,
            default: Date.now  
        },
        labelTypeDropDownSelectedValue: { 
            type: String, 
            required: false,
        },
        inputTypeDropDownSelectedValue: { 
            type: String, 
            required: false,
        },
        multipleChoiceValue: { 
            type: String, 
            required: false,
        },
        multipleChoiceLabelValue: { 
            type: String, 
            required: false,
        },
        multipleChoiceAnswerKeyValue: { 
            type: String, 
            required: false,
        },
        multipleChoiceAnswerValue: { 
            type: String, 
            required: false,
        },
        multipleChoiceAnswerExplanationKeyValue: { 
            type: String, 
            required: false,
        },
        explanationAnswerKey: { 
            type: String, 
            required: false,
        },
        explanationAnswerValue: { 
            type: String, 
            required: false,
        }
    }],
    answers: [{ 
        questionNumber:{
            type: Number,
            required: false,
        },
        id:{
            type: Number,
            required: false,
        },
        name: { 
            type: String, 
            required: false,
        },
        placeHolderText: { 
            type: String, 
            required: false,
        },
        answeredOnDateTime: { 
            type: Date, 
            required: false,
            default: Date.now  
        },
        answeredBy: { 
            type: String, 
            required: false,
        },
        markDownContent: { 
            type: String, 
            required: false,
        },
        type: { 
            type: String, 
            required: false,
        },
        value: { 
            type: String, 
            required: false,
        },
        videoUrl: { 
            type: String, 
            required: false,
        },
        questionAnsweredOnDateTime: { 
            type: Date, 
            required: false,
            default: Date.now  
        },
        courseId: { 
            type: String, 
            required: false,
        },
        comments: [{ 
            questionNumber:{
                type: Number,
                required: false,
            },
            id:{
                type: Number,
                required: false,
            },
            name: { 
                type: String, 
                required: false,
            },
            editorName: { 
                type: String, 
                required: false,
            },
            courseId: { 
                type: String, 
                required: false,
            },
            placeHolderText: { 
                type: String, 
                required: false,
            },
            commentDateTime: { 
                type: Date, 
                required: false,
                default: Date.now  
            },
            commentBy: { 
                type: String, 
                required: false,
            },
            markDownContent: { 
                type: String, 
                required: false,
            },
            type: { 
                type: String, 
                required: false,
            },
            value: { 
                type: String, 
                required: false,
            },
            videoUrl: { 
                type: String, 
                required: false,
            }
        }]
    }],
    lessonId: { 
        type: String, 
        required: false,
    },
    tutorId: { 
        type: String, 
        required: false,
    },
    studentId: { 
        type: String, 
        required: false,
    },
    userId: { 
        type: String, 
        required: false,
    },
    files: {
        type: Array,
        required: false
    },
    questionDifficultyLevel: { 
        type: String, 
        required: false,
    },
    questionCreatedBy: { 
        type: String, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: false  
    },
    coursesCovered: {
        type: Array,
        required: false
    }, 
    lessonsCovered:{
        type: Array,
        required: false
    },   
    examId: { 
        type: String, 
        required: false,
    },
    assignmentId: { 
        type: String, 
        required: false,
    }
});


export default questionSchema_rename;