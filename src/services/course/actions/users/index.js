import { 
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

import {
update,
get,
getById,
updateUser,
login,
resetPassword,
signUp,
getCurrentUserByEmail,
getLoggedInUsers,
purchase,
remove,
updateInvitationUrl,
getPagedData } from 'services/course/api';

export const LOGIN_BEGIN = "LOGIN BEGIN";
export const LOGIN_SUCCESS = "LOGIN SUCCESS";
export const LOGIN_ERROR = "LOGIN ERROR";
export const SIGN_UP_BEGINS = "SIGN UP BEGINS";
export const SIGN_UP_SUCCESSS = "SIGN UP SUCCESSS";
export const SIGN_UP_ERRORS = "SIGN UP ERRORS";
export const LOAD_USERS_BEGIN  = "LOAD USERS BEGIN";
export const LOAD_USERS_SUCCESS = "LOAD USERS SUCCESS";
export const LOAD_USER_SUCCESS = "LOAD USER SUCCESS";  
export const LOAD_USERS_ERROR = "LOAD USERS ERROR";
export const LOAD_LOGGEDIN_USERS_BEGIN = "LOAD LOGGEDIN USERS BEGIN";
export const LOAD_LOGGEDIN_USERS_SUCCESS = "LOAD LOGGEDIN USERS SUCCESS";
export const LOAD_LOGGEDIN_USERS_ERROR = "LOAD LOGGEDIN USERS ERROR";
export const LOGOUT_SUCCESS = "LOGOUT SUCCESS";
export const LAST_LOGGEDIN_USER = "LAST LOGGEDIN USER";
export const LAST_LOGGEDIN_USER_ERROR = "LAST LOGGEDIN USER ERROR";
export const BUY_COURSE_BEGIN = "BUY COURSE BEGIN";
export const BUY_COURSE_SUCCESS = "BUY COURSE SUCCESS";
export const BUY_COURSE_ERROR = "BUY COURSE ERROR";
export const ADD_TO_SALES_CART = "ADD TO SALES CART";
export const REMOVE_FROM_SALES_CART = "REMOVE FROM SALES CART";
export const RESET_USERS_CART = "RESET USERS CART";
export const UPDATE_INVITEE_LIST = "UPDATE INVITEE LIST";
export const INVITEES_TO_LEARNING_SESSION = "INVITEES TO LEARNING SESSION";
export const FAILED_INVITATION = "FAILED INVITATION";
export const UPDATE_INVITEE_SESSION_URL = "UPDATE INVITEE SESSION URL";
export const SET_USER_BIO_MARKDOWN = "SET USER BIO MARKDOWN";
export const SAVE_USER_BEGIN = "SAVE USER BEGIN";
export const SAVE_USER_SUCCESS = "SAVE USER SUCCESS";
export const SAVE_USER_ERROR = "SAVE USER ERROR";
export const UPDATE_USER = "UPDATE USER";
export const NAVIGATION_HISTORY = "NAVIGATION HISTORY";
export const RESET_PASSWORD_BEGIN = "RESET PASSWORD BEGIN";
export const RESET_PASSWORD_SUCCESS = "RESET PASSWORD SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET PASSWORD ERROR";
export const USER_UPDATED = "USER UPDATED";
export const DELETE_USER_SUCCESS = "DELETE USER SUCCESS";
export const DELETE_USER_ERROR = "DELETE USER ERROR";
export const LOAD_MEETING_USER_SUCCESS = "LOAD MEETING USER SUCCESS";

export const loginUser = (newUser) => {
   return dispatch => {
        dispatch({ type: LOGIN_BEGIN });
        return login(newUser)
        .then( user => {
            dispatch({ type: LOGIN_SUCCESS, payload: user });
            return user;
        })
        .catch( error => {
            dispatch({ type: LOGIN_ERROR , error });
            return error;
         });
    };
};

export const userPasswordReset = (newUser) => {
    return dispatch => {
        dispatch({ type: RESET_PASSWORD_BEGIN });
        return resetPassword(newUser)
         .then( user => {
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: user });
            return user;
         })
         .catch( error => {
            dispatch({ type: RESET_PASSWORD_ERROR , error });
            return error;
        });
    };
};

export function createUser(newUser) {
    return dispatch => {
    dispatch({ type: SIGN_UP_BEGINS });   
     return signUp(newUser)
        .then( user => {
            if ( (typeof user === "string" ) && (user === "Bad Server Response." || user?.includes("Bad Server Response.")) ) {
                Promise.reject( user );
                dispatch({ type: SIGN_UP_ERRORS , payload: user });
                return;
            }
            dispatch({ type: SIGN_UP_SUCCESSS, payload: user });
            return user;
         })
         .catch( error => {
            dispatch({ type: SIGN_UP_ERRORS , payload: error });
            return error;
        });
    };
};

export const createUserGeneratePassword = (newUser) => {
    let stubPassword = 'password';

    newUser.password = stubPassword;
    return dispatch => {
        dispatch({ type: SIGN_UP_BEGINS });
        return signUp(newUser)
            .then( user => {
                dispatch({ type: SIGN_UP_SUCCESSS, payload: user });
            })
            .catch( error => {
                dispatch({ type: SIGN_UP_ERRORS , payload: error });
        });
    };
};

export const logOut = ( user ) => {
    return dispatch => {
        updateUser({
            ...user, 
            userIsValidated: false
        });
        dispatch({ type: LOGOUT_SUCCESS });
    };
};

export const loadUserByEmail = ( remoteUser ) => {
    return dispatch => {
        return getCurrentUserByEmail(JSON.stringify(remoteUser))
         .then( user => {
            dispatch({ type: LOGIN_SUCCESS, payload: user });
            return user;
        })
        .catch( error => {
            dispatch({ type: LOGIN_ERROR, error });
            return error;
        });
    };
};

export const getUserByEmail = ( user ) => {
    return dispatch => { 
        return getCurrentUserByEmail(JSON.stringify(user))
         .then(user => {
            dispatch({ type: UPDATE_USER, payload: user });
            return user;
         })
         .catch( error => {
             console.log( error );
             return error;
         });
    };
};

export const loadLoggedInUsers = () => {
    return dispatch => {
        dispatch({ type: LOAD_LOGGEDIN_USERS_BEGIN });
        return getLoggedInUsers()
         .then( users => {
             dispatch({ type: LOAD_LOGGEDIN_USERS_SUCCESS, payload: users });
         })
         .catch( error => {
            dispatch({ type: LOAD_LOGGEDIN_USERS_ERROR , error });
        });
    };
};

export const lastLoggedInUser = ( currentUser ) => {
    let user = JSON.parse(sessionStorage.getItem('currentuser'));

    return dispatch  => {
        try{
            if ( currentUser ) {
                sessionStorage.clear();
                setItemInSessionStorage('currentuser', currentUser);
                setItemInSessionStorage('lastState', currentUser);
                dispatch({ type: LAST_LOGGEDIN_USER, payload: currentUser });
            } else {
                if ( user ) {
                    dispatch({ type: LAST_LOGGEDIN_USER, payload: user});
                }
            }
        } catch(e){
            dispatch({ type: LOGOUT_SUCCESS });
        };
    };
};

export const addToSalesCart = ( salesConfig ) => {
return dispatch => { 
    dispatch({ type: ADD_TO_SALES_CART, 
        payload: salesConfig });
    };
};

export const removeItemFromCart = ( course ) => {
    return dispatch => { 
        dispatch({ type: REMOVE_FROM_SALES_CART, payload: course });
    };
};

export const buyCourse = ( currentUser ) => {
    return ( dispatch ) => {
        let resetUsersCartOnError; 

        dispatch({ type: BUY_COURSE_BEGIN });
        return purchase( currentUser )
           .then(user => {
            dispatch({ type: BUY_COURSE_SUCCESS, payload: user });
        })
        .catch(error => { 
            console.log( error );
            dispatch({ type: RESET_USERS_CART, payload: { ...resetUsersCartOnError, paymentStatus: "" }}); 
            dispatch({ type: LAST_LOGGEDIN_USER, payload: { ...resetUsersCartOnError, paymentStatus: "" }});    
         });
    };
};

export const getCurrentUserById = ( currentUser ) => {
    return dispatch => {
        return getById( currentUser?._id, '/users/user?id=' )
         .then( user => {
             dispatch({ type: LOAD_USER_SUCCESS, payload: user} );
             dispatch({ type: LOAD_MEETING_USER_SUCCESS, payload: user} );
         })
          .catch( error => {
              dispatch({ type: LOAD_USERS_ERROR, payload: error } );
          });
    };
};


export const updateCurrentUser = ( currentUser ) => {
    return dispatch => {
        //
        return update( currentUser, '/users/' )
         .then( user => {
            dispatch({ type: LOAD_USER_SUCCESS, payload: user} );
            dispatch({ type: LAST_LOGGEDIN_USER, payload: user} );
         })
          .catch( error => {
              dispatch({ type: LAST_LOGGEDIN_USER_ERROR, payload: error } );
          });
    };
};

export const loadUsers = () => {
    return dispatch => {
        dispatch({ type: LOAD_USERS_BEGIN });
        get(`/users`)
        .then( users => {
            dispatch({ type: LOAD_USERS_SUCCESS, payload: users });
        }).catch( error => {
            dispatch({ type: LOAD_USERS_ERROR, error });
        });
    };
};

export const resetUsersCartAfterPurchase = (currentUser) => {
    return dispatch => {
        dispatch({ type: RESET_USERS_CART, payload: {
            ...currentUser, 
            cart: [],
            cartTotal: 0,
            paymentStatus: "" 
         }
        });
        sessionStorage.removeItem('currentuser');
    };
};

export const updateInviteeList = () => {
    return dispatch => {
        dispatch({ type: UPDATE_INVITEE_LIST });
    };
};

export const saveUser = ( user ) => {
    return dispatch => {
        dispatch({ type: SAVE_USER_BEGIN });
            return update( user, `/users/` )
            .then( user => {  
                dispatch({ type: SAVE_USER_SUCCESS, payload: user });
                dispatch(lastLoggedInUser(user));
            })
            .catch( error => {
                dispatch({ type: SAVE_USER_ERROR , error });
        });  
    };
};

export const inviteStudentsToLearningSession = ( invitees ) => {
    return dispatch => {
        try {
            dispatch({ type: INVITEES_TO_LEARNING_SESSION, payload: invitees });
        } catch (error) {
            dispatch({ type: FAILED_INVITATION, error });
        };   
    };
};

export const updateUserInvitationUrl = (user) => {
    return dispatch  => {
      try{
        updateInvitationUrl( user?._id, user );
        dispatch({ type: UPDATE_INVITEE_SESSION_URL, payload: { ...user } });
        } catch (error) {
        dispatch({ type: FAILED_INVITATION, error });
      };
    };
};

export const loadPagedUserSessions = ( userId, page, limit ) => { 
    return dispatch => {
        return getPagedData( `/users/pagedRoute?id=${userId}&page=${page}&limit=${limit}`)
        .then( login => {
            dispatch({ type: LOAD_USERS_SUCCESS, payload: login });
            return login;
        }).catch( error => {
            dispatch({ type: LOAD_USERS_ERROR , error });
            return error;
        });
    };
};

export const loginPageError = ( error ) => {
    return dispatch => {
        dispatch({ type: SIGN_UP_ERRORS, payload: error });
    };
};

export const userNavigationHistory = ( timeTravel ) => {
    return dispatch => {
        dispatch({ type: NAVIGATION_HISTORY, payload: timeTravel });
    };
};

export const deleteUser = ( user ) => {
    return dispatch => {
        return remove( user, `/users/` )
        .then( response => {
            dispatch({ type: DELETE_USER_SUCCESS, payload: user });
            return user;
        })
        .catch(error => {
            dispatch({ type: DELETE_USER_ERROR, error });
        });
    };
};