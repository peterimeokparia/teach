// refactor file size

import { testToken } from './token.js';
import { seedData } from './seedData.js';
import { generateUuid } from 'services/course/pages/Users/helpers';

export const incrementSession = ( sessions ) => {
    sessions.numberOfSessions += 1;
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            resolve({
            ...sessions
            })
        })
    });
};
    
export const decrementSessionCount = ( sessions ) => {
    sessions.numberOfSessions  -= 1;
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            resolve({
            ...sessions
            })
        })
    });
};
    
export const updateInvitationUrl = ( userId, user ) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            resolve({
            user
            });
        });
    });
};

export const signUp = ( user, route='/users/register' ) => {
    let token = testToken;
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            let _id = getId();
            let data = { ...user, token,  _id };
                        
            if ( Object.values( user ).filter(_value => _value === undefined ).length  === 0)   {
                seedData[route] = [...seedData[route], data ]
                resolve( user ); 
            } else {
                reject({ error: 'Bad request'})
            }          
        })
    });
};

export const login = ( user ) => {
    if ( ! user?.userIsVerified ) {
        Error(`${user?.email} has not been verified. Kindly check your email address inbox or spam.`);
    }

    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            let _id = user?._id;
            let loginCount = user?.loginCount; 
            let userIsValidated = true;
            let userIsVerified = user?.userIsVerified;
            let operatorId = user?.operatorId;
            let unHarshedPassword = user?.unHarshedPassword;

            if ( loginCount === undefined || loginCount === 0 ) {

                loginCount = 1;

            } else {

                loginCount += 1;
            }

            let data = { 
                ...user, 
                token: testToken,
                loginCount,
                userIsValidated,  
                userIsVerified,
                operatorId,
                unHarshedPassword,
                _id 
            };

            if ( Object.values( user ).filter(_value => _value === undefined ).length  === 0 && ( user?.userIsVerified ) )   {

                resolve( data ); 

            } else {

                reject({ error: ( ! user?.userIsVerified ) ?  `Bad Request. ${user?.email} has not been verified. Kindly check your email address inbox or spam.` : 'Bad Request.'  });

            }          
        })
    });
};

export const purchase = ( currentUser ) => {
    try {
        if( approvePayment(currentUser) ) {   
            currentUser.cart?.forEach(course  => {
                if ( ! currentUser.courses?.includes( course?.course?._id ) ) {
                    currentUser = { ...currentUser, courses: [ ...currentUser.courses, course?.course?._id ] };
                }
            }); 
            return updateUser({ 
                ...currentUser,
                cart:[],
                courses: currentUser.courses,
                sessions: currentUser.sessions,
                paymentStatus: "Approved"                 
            });
        }
    } catch (error) {
        throw Error(`Problem with payment processing. ${error}`)
    };
};

export const add = ( testobject, route  ) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            let _id = getId();
            let data = { ...testobject, _id };
            
            if ( Object.values( testobject).filter(_value => _value !== undefined ))   {
                let updatedData =  [...seedData[route], data ];

                seedData[route] = updatedData;
                resolve( testobject ); 
            } else {
                reject({ error: 'Bad request'})
            }          
        })
    });
};

export const update = ( testobject, route ) => {
    let objectKeys = Object.keys( testobject );
    let _idtoupdate = testobject['_id'];
    let object = seedData[route]?.find(_val => _val?._id === _idtoupdate );

    objectKeys?.forEach(( objKey, index ) => {
        object[ objKey ] = testobject[ objKey ];
    });

    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            if ( Object.values( testobject).filter(_value => _value !== undefined ))   {
                seedData[route] = [...seedData[route]]
                // seedData[route].find(_val => _val?._id === _idtoupdate ) = object;
                resolve( { object, testobject, data: seedData } ); 
            } else {
                reject({ error: 'Bad request'})
            }          
        })
    });
};

export const remove = ( testobject, route ) => {
    let _idtoupdate = testobject['_id'];

    seedData[route] = seedData[route]?.filter(_val => _val?._id !== _idtoupdate );
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            if ( Object.values( testobject).filter(_value => _value !== undefined ))   {
                seedData[route] = [ ...seedData[route]]
                resolve( { object: testobject, data: seedData[route] } ); 
            } else {
                reject({ error: 'Bad request'})
            }          
        })
    });
};

export const updateLessons = (lesson ) => {
    let newLessonTitle = "Test New Lesson Title";

    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            resolve({
            name: newLessonTitle,
            courseId: lesson?.courseId,
            _id: lesson?._id
            })
        })
    })
};
    
export const createCourse = (
    name,
    price,
    description,
    createdBy
) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            resolve({
            name: name,
            price: parseFloat(price),
            description: description,
            createdBy: createdBy,
            _id: "COURSE5fab4846c2a96278c56381c9"
            })
        })
    })
};
    
export const addMeetings = ( 
    invitees, 
    userId,
    sessions,
    timeStarted,
    courseId,
    lessonId,
    courseTitle,
    lessonTitle,
    meetingUrl,
    currentUser,
    usersWhoJoinedTheMeeting 
) => {
    console.log('in mock implementation@@@@@')
    return new Promise(( resolve, reject ) => {
        process.nextTick(() => {
            resolve( {_id: 'sdfsdfsfsfsdf', invitees: [], currentUser, meetings: currentUser.meetings } )
        // resolve( {_id: currentUser.meetingId, invitees, currentUser, meetings: currentUser.meetings } )
        });
    });        
};
    
export const sendEmail = (
    fromEmail,
    toEmail,
    subject,
    messageBody,
    userId
) => {
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            resolve({
            fromEmail,
            toEmail,
            subject,
            messageBody,
            userId});
        });
    }) 
};
    
export const updateUser = (currentUser) => {
    return new Promise(( resolve, reject ) => {
        process.nextTick(() => {
        resolve( {...currentUser} );
        });

    });     
};
    
export const autoRenew = (currentUser, session) => {
    return new Promise( ( resolve, reject ) => {
        let resultObject = {
            Session: {
                ...session,
                status: true,
                autoRenewDates: [ ...session?.autoRenewDates ], 
                numberOfSessions: 0 
            },
            User:{
                ...currentUser,
                paymentStatus: "approved"    
            }
        }
        process.nextTick(() => {
        if ( session ) {
            resolve({User: { ...resultObject } })
        }
        });
    });
};
    
export const approvePayment = (curentUser) => {
    if (! curentUser) { throw new Error ("please set the curentUser")};
    try {
        if ( handlePayment(curentUser) === "approved" ){
            return true;
        }
    } catch(error) {
        console.log(error.message);
    }
    return false;
};
    
export const updateSession = (sessionId, session) => {
    console.log("Mock implementation updateSession");
    return session;
}
    
export const addGrade = ( grade ) => {
    return new Promise(( resolve, reject ) => {
        process.nextTick(() => {
            resolve({ ...grade });
        })
    });
};

export const get = ( route ) => {
    return new Promise(( resolve, reject ) => {
        process.nextTick(() => {
            resolve( seedData[ route ] );
        })
    });
};

export const getById = (id, routeName) => {
    return new Promise(( resolve, reject ) => {
        process.nextTick(() => {
            resolve( seedData[routeName]?.find(data => data?.courseId === id ) );
        })
    });
};

export const getPagedData = ( route ) => {
    let splitRoute = route.split('&');
    let page = parseInt(splitRoute[1].split('=')[1]);
    let limit = parseInt(splitRoute[2].split('=')[1]);
    let testLimit = limit;
    let testPage = page;
    return new Promise(( resolve, reject ) => {
        process.nextTick(() => {
            let data = seedData['paginationSeedData'];
            let limit = testLimit;
            let page = testPage;
            let startIndex = (( page - 1 ) * limit );
            let endIndex = ( page * limit );
            const result = {};

            if ( endIndex < data.length ) {
                result.next = { page: ( page + 1 ), limit };
            }

            if ( startIndex > 1 ) {
                result.previous = { page: ( page - 1 ), limit };
            }

            result.total = data.length;
            result.page = page;
            result.pages = Math.ceil( data.length / limit);
            result.resultTest = data;
            result.results = data.slice(startIndex, endIndex);
            resolve( result );
        })
    });
};

let paymentGatewayProvider = {provider: "xyz", approvalStatus: "approved"}
    // paymentgateway integration and logic - this is a stub
    const handlePayment = (curentUser, gatewayProvider = paymentGatewayProvider) => {
    let approvalCode;

    if ( curentUser && gatewayProvider){
        approvalCode = gatewayProvider.approvalStatus;
    }
    return "approved";
};

function getId(){
    let max = 89456, min = 10325;
    let time = Date.now();
    return `Lesson${Math.floor( Math.random() * (max - min + 1) + min)}${time}`;
}