import { 
tokenGenerator, 
privateKey} from 'services/course/pages/loginpage/components/Authentication';
    
import {
testToken } from './token.js';

import {
seedData } from './seedData.js';

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

            console.log("Mock implementation signUp");
            console.log(data);
            
            if ( Object.values( user ).filter(_value => _value === undefined ).length  === 0)   {
                console.log(".. in Mock implementation signUp");
                    console.log( JSON.stringify(  seedData[route] ) );
                seedData[route] = [...seedData[route], data ]
                console.log(".. in after adding user to seed data Mock implementation signUp");
                console.log(route)
                console.log( seedData[route] )
                resolve( user ); 
            } else {
                reject({ error: 'Bad request'})
            }          
        })
    });
};

export const login = ( user ) => {
    console.log( JSON.stringify( user ) )
    if ( ! user?.userIsVerified ) {
        console.log( 'throw')
        console.log(  user?.userIsVerified  );
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

            console.log("Mock implementation login");
            console.log(data);
            
            if ( Object.values( user ).filter(_value => _value === undefined ).length  === 0 && ( user?.userIsVerified ) )   {
                console.log(".. in Mock implementation login");
                console.log(".. in after adding user to seed data Mock implementation login");
                resolve( data ); 
            } else {
                reject({ error: ( ! user?.userIsVerified ) ?  `Bad Request. ${user?.email} has not been verified. Kindly check your email address inbox or spam.` : 'Bad Request.'  })
            }          
        })
    });
};

export const purchase = ( currentUser ) => {
    try {
        console.log("Mock implementation purchase");
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
    console.log("Mock implementation add");
    console.log(testobject);
    return new Promise((resolve, reject) => {
        process.nextTick(() => {
            let _id = getId();
            let data = { ...testobject, _id };
            
            if ( Object.values( testobject).filter(_value => _value !== undefined ))   {
                // seedData[route] = [...seedData[route], data ]
                let updatedData =  [...seedData[route], data ];
                seedData[route] = updatedData;
                console.log( seedData[route])
                resolve( testobject ); 
            } else {
                reject({ error: 'Bad request'})
            }          
        })
    });
};

export const update = ( testobject, route ) => {
    console.log('seed data in update route route route')
    console.log(route)
    console.log("Mock implementation update", { ...testobject });
    let objectKeys = Object.keys( testobject );
    let _idtoupdate = testobject['_id'];
    let object = seedData[route]?.find(_val => _val?._id === _idtoupdate );

    console.log('seed data in update')
    console.log(JSON.stringify( seedData[route]))

    console.log('found object')
    console.log(JSON.stringify( object ))

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
    console.log('Seed data count before delete');
    console.log(seedData[route]?.length );
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
usersWhoJoinedTheMeeting ) => {
console.log("Mock implementation addMeetings")
return new Promise(( resolve, reject ) => {
    process.nextTick(() => {
    resolve( {_id: currentUser.meetingId, invitees, currentUser, meetings: currentUser.meetings } )
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
console.log("Mock Mock Mock Implementation");
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
console.log("Mock implementation updateUser")
return new Promise(( resolve, reject ) => {
    process.nextTick(() => {
    resolve( {...currentUser} );
    });

});     
};
    
export const autoRenew = (currentUser, session) => {
console.log("Mock implementation autoRenew");
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
    console.log("Mock implementation approvePayment");
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
console.log("Mock implementation addGrade", { ...grade });
    return new Promise(( resolve, reject ) => {
    process.nextTick(() => {
        resolve({ ...grade });
    })
    });
};

export const get = ( route ) => {
console.log("Mock implementation GET");
    return new Promise(( resolve, reject ) => {
        process.nextTick(() => {
            resolve( seedData[ route ] );
        })
    });
};

export const getById = (id, routeName) => {
console.log("Mock implementation getById", id);
console.log("Mock implementation routeName", routeName);
console.log("Mock implementation routeName", Object.values( seedData[routeName] ));

return new Promise(( resolve, reject ) => {
    process.nextTick(() => {
        resolve( seedData[routeName]?.find(data => data?.courseId === id ) );
    })
});
};

export const getPagedData = ( route ) => {
    console.log('in mock implementation');
    console.log('route');
    console.log( route );
    console.log( JSON.stringify( route.split('&') ))
    let splitRoute = route.split('&');
    let page = parseInt(splitRoute[1].split('=')[1]);
    let limit = parseInt(splitRoute[2].split('=')[1]);
    console.log('page');
    console.log(page);
    console.log('limit');
    console.log(limit);
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