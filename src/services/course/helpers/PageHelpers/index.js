import {
serviceWorkerSupported,
send } from '../PushNotifications';

import randomColor from 'randomcolor';

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
    markDownContent: "",
    avatarUrl: "",
    files: [],
    classRooms: [],
    operatorId: "",
    timeMeetingStarted: null,
    timeMeetingEnded: null,
    assignments: [],
    exams: []
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
    Student: "Student",
    School: "School",
    Organization: "Organization",
    Individual: "Individual",
    Admin: "Admin",
};

export const roleTypeCollection = [
    role.Tutor, role.Student,
    role.School, role.Organization,
    role.Individual, role.Admin
];

export const cleanUrl = ( urlValue ) => {
    return urlValue?.replace(/\s+/g, "%20");
};

export const handlePushNotificationSubscription = ( subscribedUsers, user,  newSubscriptionAction, addDeviceToExistingSubscriptionAction ) => {
    let subscribedUser = undefined, subscription = undefined;

    subscribedUsers.every(element => {
        if ( element?.userId === user?._id ) {
            subscribedUser = element;
            return false;
        }
        return true;
    });

    if ( serviceWorkerSupported() ) {
        subscription = send();
    }

    if ( subscription ) {

        subscription
        .then(
            response => {
                let endpointExists = subscribedUser?.subscriptions?.find( subscription => subscription?.endpoint === response?.endpoint );
                
                if  ( subscribedUser && (! endpointExists ) ) {
                    addDeviceToExistingSubscriptionAction( { ...subscribedUser, subscriptions: [ ...subscribedUser?.subscriptions,  response ] } );
                } 
                
                if ( !subscribedUser ) {
                    newSubscriptionAction( { userId: user?._id,  subscriptions: [ response ],  operatorId: user?.operatorId } );
                }
            }

        ).catch( error => console.error( error ));   

    }

};

export const validateOperatorBusinessName = () => <div>{"Please verify the url"}</div> ;

export const passwordFailedValidationMessages = {
    upperCase: "Must include an uppercase character.",
    lowerCase: "Must include a lowercase character.",
    number: "Must include a number.",
    symbol: "Must contain one of the following symbols: $@$!%*#?&",
    length: "Must be between 8 to 20 characters in length."
};
export function passwordValidator(password){
    if ( password === "" ) { throw Error('Please enter a valid password.'); }

    let result = {}, regexRequirement = [
        {regex: "[A-Z]", message: passwordFailedValidationMessages?.upperCase, points: 20}, 
        {regex: "[a-z]", message: passwordFailedValidationMessages?.lowerCase, points: 20}, 
        {regex: "[0-9]", message: passwordFailedValidationMessages?.number, points: 20}, 
        {regex: "[ $@$!%*#?& ]", message: passwordFailedValidationMessages?.symbol, points: 20},
        {regex: ".{8,20}", message: passwordFailedValidationMessages?.length, points: 20},
        // {regex: ".{,20}", message: passwordFailedValidationMessages?.maxLength, points: 10}
    ];

    try {
        result = getValue( regexRequirement, password );
    } catch (error) {
        Error(`Password Validation: ${error}`);
    }
    return result;
};

function getValue(regexPatternRequirement, password){
    let failedPasswordTest = [], validPasswordTest = [], passwordStrength=0; 

    for( let i = 0; i < regexPatternRequirement?.length; i++ ){
        if ( new RegExp( regexPatternRequirement[i]?.regex ).test(password) ) {
            validPasswordTest = [ ...validPasswordTest, regexPatternRequirement[i] ];
            passwordStrength += regexPatternRequirement[i]?.points;
        } else {
            failedPasswordTest = [ ...failedPasswordTest, regexPatternRequirement[i]?.message ];
        }
    }
    return {
        validPasswordTest,
        passwordStrength,
        failedPasswordTest,
        password
    };
};

export function getServerUrl( port ){
    return getHostName() ? `http://localhost:${port}` : 'https://ravingfanstudents.com';
};

export function getHostName(){
    return (window.location.hostname === 'localhost');
};

export const getItemColor = ( items ) => {
    let color = null;
    let existingColor = null;
    
    color = generateRandomColor();

    do {
        existingColor = items?.find( item => item?.color === color );
        
        if ( !existingColor ) {
            break;
        }
    } while ( existingColor );
    return color;
};

export const generateRandomColor = () => {
  return randomColor({ luminosity: 'light',  hue: 'random' });
};
