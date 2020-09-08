import produce from 'immer';
import {
LOGIN_BEGIN, 
LOGIN_SUCCESS, 
LOGIN_ERROR, 
SIGN_UP_BEGINS, 
SIGN_UP_SUCCESSS,
SIGN_UP_ERRORS, 
LOAD_USERS_BEGIN, 
LOAD_USERS_SUCCESS,  
LOAD_USERS_ERROR,
LOAD_LOGGEDIN_USERS_BEGIN, 
LOAD_LOGGEDIN_USERS_SUCCESS, 
LOAD_LOGGEDIN_USERS_ERROR, 
LOGOUT_SUCCESS, 
LAST_LOGGEDIN_USER, 
ADD_TO_SALES_CART, 
REMOVE_FROM_SALES_CART,
BUY_COURSE_BEGIN, 
BUY_COURSE_SUCCESS, 
BUY_COURSE_ERROR, 
RESET_USERS_CART,
INVITEES_TO_LEARNING_SESSION,
FAILED_INVITATION,
UPDATE_INVITEE_SESSION_URL} from '../services/course/actions';


const initialState = {
    users: {},
    user:{},
    invitees:new Map(),
    login:[],
    lastLoggedInUser:{},
    error: null,
    loading: false,
    buy: []
};


const reducer = produce((draft, action) => {
    switch(action.type){
        case SIGN_UP_BEGINS:
        case LOGIN_BEGIN:
        case BUY_COURSE_BEGIN:     
            draft.loading = true;
            draft.error = null;
        return;
        case SIGN_UP_SUCCESSS:
        case LOGIN_SUCCESS:      
             draft.loading = false;
             draft.user = action.payload;   
        return;
        case SIGN_UP_ERRORS:
        case LOGIN_ERROR:
        case BUY_COURSE_ERROR:      
             draft.loading = false;
             draft.error = action.error;
             draft.user = null;
        return;
        case LOAD_USERS_BEGIN:
        case LOAD_LOGGEDIN_USERS_BEGIN:    
            draft.loading = true;
            draft.error = null;
        return;
        case LOAD_USERS_SUCCESS: 
            draft.loading = false;
            action.payload.forEach(user => {
                draft.users[user?._id] = user; 
            });
        return;
        case LOAD_LOGGEDIN_USERS_SUCCESS:   
             draft.loading = false;
             draft.login = action.payload;   
        return;
        case LOAD_USERS_ERROR:
        case LOAD_LOGGEDIN_USERS_ERROR:    
             draft.loading = false;
             draft.error = action.error;
        return;
        case LOGOUT_SUCCESS:   
            draft.loading = false;
            draft.error = null;
            draft.user = null;
            draft.users = {}   
        return;
        case LAST_LOGGEDIN_USER:    
             draft.lastLoggedInUser = action.payload;
             draft.user = action.payload;
        return;
        case ADD_TO_SALES_CART:
             draft.user.cart.push(action.payload);
             draft.user.cartTotal +=  action.payload.price; 
        return;
        case BUY_COURSE_SUCCESS:
             draft.loading = false;  
             draft.user = action.payload;
             draft.buy = action.payload;
        return;     
        case REMOVE_FROM_SALES_CART:
             draft.user.cart = draft.user.cart.filter(course => course._id !== action.payload._id)
             draft.user.cartTotal -= action.payload.price;   
        return;
        case RESET_USERS_CART:
             draft.user = action.payload;
        return 
        case INVITEES_TO_LEARNING_SESSION:
             draft.invitees = action.payload;
        return;
        case FAILED_INVITATION:
             draft.error = action.error;
        return 
        case UPDATE_INVITEE_SESSION_URL: 
             draft.users[action.payload._id] = action.payload;
        return;                 
        default:
        return;

    }
    
}, initialState);


export default reducer;