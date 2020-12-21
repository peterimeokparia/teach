
export const newSiteUser = {
    firstname:"", 
    email:"",
    password:"",
    token: null,
    role: null,
    courses: [],
    numberOfCourseSessions: [],
    cart: [],
    cartTotal: 0,
    paymentStatus:"",
    userId: null,
    purchaseHistoryTimeStamp: null,
    inviteeSessionUrl: "",
    lessonInProgress: false,
    userIsValidated: false,
    nameOfLessonInProgress: "",
    loginCount: 0,
    meetingId: "",
    meetings: [],
    sessions: [],
    markDown: "",
    avatarUrl: "",
    files: [],
    classRooms: [],
    operatorId: "",
    timeMeetingStarted: null,
    timeMeetingEnded: null
};


export const operatorUser = {
    firstName: "", 
    lastName: "",
    businessName: "",
    email: "",
    password: "",
    token: null,
    phone: "",
    timeJoined: Date.now()

};


export const role = {
    Tutor: "Tutor",
    Student: "Student"
};


export const cleanUrl = ( urlValue ) => {

    return urlValue?.replace(/\s+/g, "%20");
}; 


       
