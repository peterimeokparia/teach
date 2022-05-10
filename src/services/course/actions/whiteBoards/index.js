
import {
add,
update,
get,
remove,
getById } from 'services/course/api';

export const ADD_WHITEBOARD_JSONDATA_BEGIN = "ADD WHITEBOARD JSONDATA BEGIN";
export const ADD_WHITEBOARD_JSONDATA_SUCCESS = "ADD WHITEBOARD JSONDATA SUCCESS";
export const ADD_WHITEBOARD_JSONDATA_ERROR = "ADD WHITEBOARD JSONDATA ERROR";
export const LOAD_WHITEBOARD_JSONDATA_BEGIN = "LOAD WHITEBOARD JSONDATA BEGIN";
export const LOAD_WHITEBOARD_JSONDATA_SUCCESS = "LOAD WHITEBOARD JSONDATA SUCCESS";
export const LOAD_LATEST_WHITEBOARD_JSONDATA_SUCCESS = "LOAD LATEST WHITEBOARD JSONDATA SUCCESS";
export const LOAD_WHITEBOARD_JSONDATA_ERROR = "LOAD WHITEBOARD JSONDATA ERROR";
export const DELETE_WHITEBOARD_JSONDATA_SUCCESS = "DELETE WHITEBOARD JSONDATA SUCCESS";
export const DELETE_WHITEBOARD_JSONDATA_ERROR = "DELETE WHITEBOARD JSONDATA ERROR";
export const SAVE_WHITEBOARD_JSONDATA_BEGIN = "SAVE WHITEBOARD JSONDATA BEGIN";
export const SAVE_WHITEBOARD_JSONDATA_ERROR = "SAVE WHITEBOARD JSONDATA ERROR";
export const SAVE_WHITEBOARD_JSONDATA_SUCCESS = "SAVE WHITEBOARD JSONDATA SUCCESS";

export const addWhiteBoardData = ( whiteBoardData ) => {
    return dispatch => { 
    dispatch({ type: ADD_WHITEBOARD_JSONDATA_BEGIN });
    return fetch(`http://localhost:9090/api/loadwhiteboard?wid=${whiteBoardData?.wid}`)
      .then(response => response.json() )
        .then( data => {
            return add( {
                ...whiteBoardData,
                whiteBoardJasonData: JSON.stringify( data )
            }, `/whiteboards` )
                .then( response => { 
                    dispatch({type: ADD_WHITEBOARD_JSONDATA_SUCCESS, payload: response });   
                    fetch(`http://localhost:9090/api/clearwhiteboardData?wid=${whiteBoardData?.wid}`)
                     .then( resp => { 
                         console.log( resp );
                         return response;
                    });      
                })
                .catch( error => {
                    dispatch({ type: ADD_WHITEBOARD_JSONDATA_ERROR , error });
            });
        })
        .catch( error => { 
            console.log( error ); 
        });
    };
};

export const selectSavedWhiteBoard = ( whiteBoardData ) => {
    return dispatch => { 
    dispatch({ type: ADD_WHITEBOARD_JSONDATA_BEGIN });
    return fetch(`http://localhost:9090/api/updateWhiteboardJsonDataFromTeachDb`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wid: whiteBoardData?.wid,   jsonData: whiteBoardData?.jsonData }),
      })
      .then(response => response.json() )
        .then( data => {
            dispatch({ type: LOAD_WHITEBOARD_JSONDATA_SUCCESS, payload: data });
            dispatch({ type: LOAD_LATEST_WHITEBOARD_JSONDATA_SUCCESS, payload: data });  
            return data;
        })
       .catch( error => { 
           console.log( error );
            return error;
        });
    };
};

export const saveWhiteBoardData = ( whiteBoardData ) => {
    return dispatch => {
         dispatch({ type: SAVE_WHITEBOARD_JSONDATA_BEGIN });
         return update( whiteBoardData, `/whiteboards/` )
          .then( response => {
              dispatch({ type: SAVE_WHITEBOARD_JSONDATA_SUCCESS, payload: response }); 
              dispatch({ type: LOAD_LATEST_WHITEBOARD_JSONDATA_SUCCESS, payload: response }); 
           }).catch( error => {
                dispatch({ type: SAVE_WHITEBOARD_JSONDATA_ERROR , error });
        }); 
    };
};

export const loadWhiteBoardData = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_WHITEBOARD_JSONDATA_BEGIN });
         return get(`/whiteboards`)
          .then( response  => { 
             dispatch({ type: LOAD_WHITEBOARD_JSONDATA_SUCCESS, payload: response }); 
           }).catch( error => {
             dispatch({ type: LOAD_WHITEBOARD_JSONDATA_ERROR , error });
        });       
    };
};

export const loadWhiteBoardDataByWid = ( wid ) => {
    return dispatch => {
         dispatch({ type: LOAD_WHITEBOARD_JSONDATA_BEGIN });
         return getById( wid, `/whiteboards/byWid?wid=`)
          .then( response  => { 
                dispatch({ type: LOAD_WHITEBOARD_JSONDATA_SUCCESS, payload: response });
                dispatch({ type: LOAD_LATEST_WHITEBOARD_JSONDATA_SUCCESS, payload: response });
           }).catch( error => {
                dispatch({ type: LOAD_WHITEBOARD_JSONDATA_ERROR , error });
           });       
    };
};

export const loadWhiteBoardDataById = ( id ) => {
    return dispatch => {
         dispatch({ type: LOAD_WHITEBOARD_JSONDATA_BEGIN });
         return getById( id, `/whiteboards/byId?id=`)
          .then( response  => { 
                dispatch({ type: LOAD_WHITEBOARD_JSONDATA_SUCCESS, payload: response });
                dispatch({ type: LOAD_LATEST_WHITEBOARD_JSONDATA_SUCCESS, payload: response });
           }).catch( error => {
                dispatch({ type: LOAD_WHITEBOARD_JSONDATA_ERROR , error });
        });       
    };
};

export const deleteQuestion = whiteBoardData => {
    return dispatch => {
         return remove( whiteBoardData, `/whiteboards/` )
         .then( () => {
             dispatch({ type: DELETE_WHITEBOARD_JSONDATA_SUCCESS, payload: whiteBoardData });
         }).catch( error => {
            dispatch({ type: DELETE_WHITEBOARD_JSONDATA_ERROR , error });
        });
    };
};


