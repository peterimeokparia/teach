export const incrementSession = ( sessions ) => {

  sessions.numberOfSessions += 1;

  return new Promise((resolve, reject) => {

    process.nextTick(() => {

       resolve({
        ...sessions
       })

    })

 });

}




export const decrementSessionCount = ( sessions ) => {

  sessions.numberOfSessions  -= 1;

  return new Promise((resolve, reject) => {

    process.nextTick(() => {

       resolve({
        ...sessions
       })

    })

 });

}



export const updateInvitationUrl = ( 
  userId,  
  user 
) => {

  return new Promise((resolve, reject) => {

    process.nextTick(() => {

       resolve({
        user
       })

    })

 });

};



export const addLessons = (
  name,
  courseId
) => {

  return new Promise((resolve, reject) => {

     process.nextTick(() => {

        resolve({
          name: name,
          courseId: courseId,
          _id: "LESSON5fab4846c2a96278c56381c9"
        })

     })

  });
}




export const updateLessons = (
  lesson,
) => {

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
}





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
}




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

   })

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
  
}



export const updateUser = (currentUser) => {

console.log("Mock implementation updateUser")

return new Promise(( resolve, reject ) => {


   process.nextTick(() => {

    
    resolve( {...currentUser} );


    });

  });     
}




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
          //(currentUser || session ) ? resolve(resultObject)
            //                           : reject( { error: ' there was a problem'} )
         
        });
    });
  
  }




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
}



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
}



export const add = ( data ) => {

  console.log("Mock implementation add", { ...data });
  return new Promise(( resolve, reject ) => {

     process.nextTick(() => {

       resolve({ ...data });

     })

  });
}



export const update = ( data ) => {

  console.log("Mock implementation update", { ...data });
   return new Promise(( resolve, reject ) => {
 
      process.nextTick(() => {

        resolve({ ...data });

      })

   });
}




  
let paymentGatewayProvider = {provider: "xyz", approvalStatus: "approved"}

// paymentgateway integration and logic - this is a stub
 const handlePayment = (curentUser, gatewayProvider = paymentGatewayProvider) => {

    let approvalCode;
     
    if ( curentUser && gatewayProvider){
        
         approvalCode = gatewayProvider.approvalStatus;
    }

    return "approved";
}