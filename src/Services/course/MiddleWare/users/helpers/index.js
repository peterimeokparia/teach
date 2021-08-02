import {
    add,
    updateUser,
    sendEmail } from 'teach/src/services/course/api';
    
    import {
    RESET_USERS_CART,
    LAST_LOGGEDIN_USER } from 'teach/src/services/course/actions/users';
    
    const emailMessageConfig = {
        sendersEmailAddress: "teachpadsconnect247@gmail.com",
        emailHeader: "Welcome to teach!",
    };
    
    const routePrefix = "http://localhost:3000";
    
    export const handleCartOnPurchase = ( user, store ) => {
        if (!user || !store ) return;
        user.cart.forEach(( course ) => {
            add( courseConfig( course ), `/sessions`)
            .then(session => {
                updateStudentsSession( user, store, session );
                updateTutorsSession( course, store, session );           
           })
           .catch(error => {  
               console.log( error );
           });
         });
    };
    
    export const handleSignUpSuccess = ( user, store ) => {
        if (!user) return;
    
        let currentState = store?.getState();
    
        let operatorBusinessName = (currentState?.operators?.operators[user?.operatorId])?.businessName;
        
        try {
            sendEmail(
                emailMessageConfig?.sendersEmailAddress, // change
                user?.email, 
                emailMessageConfig?.emailHeader, // too specific change
                `Kindly verify your account ${routePrefix}/${operatorBusinessName}/accountverification/${user?._id}`,  /// add operatorBusiness name to user or as args 
                user?._id
            );
            
            sendEmail(
                emailMessageConfig?.sendersEmailAddress,
                user?.email, 
                emailMessageConfig?.emailHeader,
                `Your credentials: ${user.firstname}, ${user.password}`,
                user?._id
            );
        } catch (error) {
          console.error( `Problem sending sign up success email message(s)${ error }`);   
        }
    };
    
    export const handleOperatorSignUpSuccess = ( operator ) => {
        if ( !operator ) return;
        try {
            sendEmail(
                emailMessageConfig?.sendersEmailAddress,
                operator?.email, 
                emailMessageConfig?.emailHeader,
                `Your credentials: ${operator.email}, ${operator.password}. Your website url: ${routePrefix}/${operator?.businessName}/login`,
                operator?._id
            );
        } catch (error) {
            console.error( `Problem sending operator sign up success email message(s)${ error }`);  
        }
    };
    
    const updateStudentsSession = ( user, store, session ) => {
        updateUser({ ...user, sessions: [ ...user?.sessions, session?._id ], cart: [],  
            cartTotal: 0, paymentStatus: "" })
        .then( user => {
            store?.dispatch({ type: RESET_USERS_CART, payload: user }); 
            store?.dispatch({ type: LAST_LOGGEDIN_USER, payload : user }); 
        })
        .catch( error => console.log( error ) );
    };
    
    const updateTutorsSession = ( course, store, session  ) => {
        updateUser({ ...course?.tutor, sessions: [ ...course?.tutor?.sessions, session?._id ] })
        .then(tutor => {
            console.log( `updating: ${ tutor?.email }`);
        })
        .catch(error => console.log(error));  
    };
    
    function courseConfig( course ) {
        return { 
            courseId: course?.course?._id, 
            typeOfSession: course?.sessionType,  
            numberOfSessions: parseInt(course?.numberOfSessions,10), 
            totalNumberOfSessions: parseInt(course?.totalNumberOfSessions,10), 
            userId: course?.userId,
            tutorId: course?.tutor?._id,
            startDate: Date.now(),
            status: true,
            autoRenew: course.autoRenew
      };
    };  