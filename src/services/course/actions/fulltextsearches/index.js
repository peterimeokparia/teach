import {
add,
update,
get,
remove,
getById,
getPagedData } from 'services/course/api';

export const SET_FULLTEXTSEARCH_CONTENT = "SET FULLTEXTSEARCH CONTENT";
export const ADD_FULLTEXTSEARCH_BEGIN = "ADD FULLTEXTSEARCH BEGIN";
export const ADD_FULLTEXTSEARCH_SUCCESS = "ADD FULLTEXTSEARCH SUCCESS";
export const ADD_FULLTEXTSEARCH_ERROR = "ADD FULLTEXTSEARCH ERROR";
export const LOAD_FULLTEXTSEARCHES_BEGIN = "LOAD FULLTEXTSEARCHES BEGIN";
export const LOAD_FULLTEXTSEARCHES_SUCCESS = "LOAD FULLTEXTSEARCHES SUCCESS";
export const LOAD_FULLTEXTSEARCHES_ERROR = "LOAD FULLTEXTSEARCHES ERROR";
export const DELETE_FULLTEXTSEARCH_BEGIN = "DELETE FULLTEXTSEARCH BEGIN";
export const DELETE_FULLTEXTSEARCH_SUCCESS = "DELETE FULLTEXTSEARCH SUCCESS";
export const DELETE_FULLTEXTSEARCH_ERROR = "DELETE FULLTEXTSEARCH ERROR";
export const SAVE_FULLTEXTSEARCH_BEGIN = "SAVE FULLTEXTSEARCH BEGIN";
export const SAVE_FULLTEXTSEARCH_ERROR = "SAVE FULLTEXTSEARCH ERROR";
export const SAVE_FULLTEXTSEARCH_SUCCESS = "SAVE FULLTEXTSEARCH SUCCESS";

export const addNewFullTextSearchContent = ( searchContent ) => {
    return dispatch => {
        dispatch({ type: ADD_FULLTEXTSEARCH_BEGIN });
        return add( searchContent, `/fulltextsearch` )
        .then( response => { 
            dispatch({type: ADD_FULLTEXTSEARCH_SUCCESS, payload: response }); 
            return response;       
    }).catch( error => {
        dispatch({ type: ADD_FULLTEXTSEARCH_ERROR , error });
        return error;  
    });
  };
};

export const saveFullTextSearchContent = ( searchContent ) => {
    return dispatch => {
         dispatch({ type: SAVE_FULLTEXTSEARCH_BEGIN });
         return update( searchContent, `/fulltextsearch/` )
          .then( response => { 
              dispatch({ type: SAVE_FULLTEXTSEARCH_SUCCESS, payload: response }); 
              return response;
           }).catch( error => {
                dispatch({ type: SAVE_FULLTEXTSEARCH_ERROR , error });
                return error;
        }); 
    };
};

export const loadPagedFullTextSearchContent = ( searchTerm, page, limit ) => { 
    return dispatch => {
        return getPagedData( `/fulltextsearch/pagedRoute?searchTerm=${searchTerm}&page=${page}&limit=${limit}`)
        .then( searchContent => {
            dispatch({ type: LOAD_FULLTEXTSEARCHES_SUCCESS, payload: searchContent });
            return searchContent;
        }).catch( error => {
            dispatch({ type: LOAD_FULLTEXTSEARCHES_ERROR , error });
            return error;
        });
    };
};

export const loadFullTextSearchContent = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_FULLTEXTSEARCHES_BEGIN });
         return get(`/fulltextsearch`)
          .then( searchContent  => { 
             dispatch({ type: LOAD_FULLTEXTSEARCHES_SUCCESS, payload: searchContent });
           }).catch( error => {
             dispatch({ type: LOAD_FULLTEXTSEARCHES_ERROR , error });
        });       
    };
};

export const loadFullTextSearchContentBySearchId = ( searchId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FULLTEXTSEARCHES_BEGIN });
         return getById( searchId, `/fulltextsearch/search?searchId=`)
          .then( searchContent  => { 
                dispatch({ type: LOAD_FULLTEXTSEARCHES_SUCCESS, payload: searchContent });
           }).catch( error => {
                dispatch({ type: LOAD_FULLTEXTSEARCHES_ERROR , error });
           });       
    };
};

export const loadFullTextSearchContentByContentId = ( contentId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FULLTEXTSEARCHES_BEGIN });
         return getById( contentId, `/fulltextsearch/type?contentId=`)
          .then( searchContent  => { 
                dispatch({ type: LOAD_FULLTEXTSEARCHES_SUCCESS, payload: searchContent });
           }).catch( error => {
                dispatch({ type: LOAD_FULLTEXTSEARCHES_ERROR , error });
           });       
    };
};

export const loadFullTextSearchContentByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FULLTEXTSEARCHES_BEGIN });
         return getById( userId, `/fulltextsearch/user?userId=`)
          .then( searchContent  => { 
                dispatch({ type: LOAD_FULLTEXTSEARCHES_SUCCESS, payload: searchContent });
           }).catch( error => {
                dispatch({ type: LOAD_FULLTEXTSEARCHES_ERROR , error });
        });       
    };
};

export const deleteFullTextSearchContent = searchContent => {
    return dispatch => {
        dispatch({ type: DELETE_FULLTEXTSEARCH_BEGIN });
         return remove( searchContent, `/fulltextsearch/` )
         .then( res => {
            dispatch({ type: DELETE_FULLTEXTSEARCH_SUCCESS, payload: searchContent });
         }).catch( error => {
            dispatch({ type: DELETE_FULLTEXTSEARCH_ERROR , error });
        });
    };
};

let timerHandle = null;

export const setFullTextSearchContent = ( teachObject, content, teachObjectType="", actionType, saveAction  ) => {
    return ( dispatch, getState )  => {
        dispatch({ type: actionType, payload: {   
            teachObject,
            content
          }});

        if ( timerHandle ){
            clearTimeout( timerHandle );
        }
        timerHandle = setTimeout(() => {
            console.log("...saving content"); 
            const latestTeachObjectData = getState()[teachObjectType][teachObjectType][ teachObject?._id ]; 
            
            dispatch(saveAction( latestTeachObjectData ));
        }, 2000);  
    };
};
