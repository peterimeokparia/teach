export const getPushMessageConfigValues = ( state, action ) => {
    return {
        allSubscribedPushUsers: Object.values( state?.notifications?.pushNotificationSubscribers ),
        currentUser: Object.values( state?.users?.users )?.find(user => user?._id === action?.payload?.userId ),
    };
};

export function getOnlineQuestion( action, state ) {
    return ( action?.payload?.onlineQuestionId === null || 
             action?.payload?.onlineQuestionId === undefined ) 
               ? action?.payload
               : Object.values( state?.onlineQuestions?.onlineQuestions )?.find( question => question?._id === action?.payload?.onlineQuestionId );
};

export const NotificationEntityEnum = {
    EntityType: {
        Question: "Question",
        Course: "Course",
        Deleted: "Update: Deleted",
        Answer: "Answer",
        Comments: "Comments"
    },
    PushMessage: {
        NEW_COURSE_ADDED_PUSH: "NEW COURSE ADDED PUSH",
        NEW_QUESTION_ADDED_PUSH: "NEW QUESTION ADDED PUSH" ,
        COURSE_UPDATED_PUSH: "COURSE UPDATED PUSH",
        QUESTION_UPDATED_PUSH: "QUESTION UPDATED PUSH",
        NEW_ANSWER_ADDED_PUSH: "NEW ANSWER ADDED PUSH",
        ANSWER_UPDATED_PUSH: "ANSWER UPDATED PUSH",
        NEW_COMMENT_ADDED_PUSH: "NEW COMMENT ADDED PUSH",
        COMMENT_UPDATED_PUSH: "COMMENT UPDATED PUSH",
        QUESTION_REMOVED_PUSH: "QUESTION REMOVED PUSH",
        QUESTION_SAVED_PUSH: "QUESTION SAVED PUSH",
        HANDLE_QUESTION_PUSH_MESSAGE_BODY: "HANDLE QUESTION PUSH MESSAGE BODY",
        HANDLE_COURSE_PUSH_MESSAGE_BODY: "HANDLE COURSE PUSH MESSAGE BODY"
    },
    EmailMessage: {
        NEW_COURSE_ADDED_EMAIL: "NEW COURSE ADDED EMAIL",
        NEW_QUESTION_ADDED_EMAIL: "NEW QUESTION ADDED EMAIL",
        COURSE_UPDATED_EMAIL: "COURSE UPDATED EMAIL",
        QUESTION_UPDATED_EMAIL: "QUESTION UPDATED EMAIL",
        NEW_ANSWER_ADDED_EMAIL: "NEW ANSWER ADDED EMAIL",
        ANSWER_UPDATED_EMAIL: "ANSWER UPDATED EMAIL",
        NEW_COMMENT_ADDED_EMAIL: "NEW COMMENT ADDED EMAIL",
        COMMENT_UPDATED_EMAIL: "COMMENT UPDATED EMAIL",
        QUESTION_REMOVED_EMAIL: "QUESTION REMOVED EMAIL",
        QUESTION_SAVED_EMAIL: "QUESTION SAVED EMAIL",
        HANDLE_QUESTION_EMAIL: "HANDLE QUESTION EMAIL",
        HANDLE_COURSE_EMAIL: "HANDLE COURSE EMAIL"
    }
 };

 export const getCurrentUser = ( config ) => {
    return ( config?.state?.users?.user?.firstname === undefined ) 
            ? ( config?.state?.users?.users?.find( user => user?._id === config?.action?.payload?.userId ))
            : ( config?.state?.users?.user );
 };
