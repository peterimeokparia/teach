import {
add,
update,
remove,
get,
getById } from 'services/course/api';

export const LOAD_TIMELINES_BEGIN = "LOAD TIMELINES BEGIN";
export const LOAD_TIMELINES_SUCCESS = "LOAD TIMELINES SUCCESS";
export const LOAD_TIMELINES_ERROR = "LOAD TIMELINES ERROR";
export const ADD_NEW_TIMELINE_BEGIN = "ADD NEW TIMELINE BEGIN";
export const ADD_NEW_TIMELINE_SUCCESS = "ADD NEW TIMELINE SUCCESS"; 
export const ADD_NEW_TIMELINE_ERROR = "ADD NEW TIMELINE ERROR";
export const SAVE_TIMELINE_BEGIN = "SAVE TIMELINE BEGIN";
export const SAVE_TIMELINE_SUCCESS = "SAVE TIMELINE SUCCESS";
export const SAVE_TIMELINE_ERROR = "SAVE TIMELINE ERROR";
export const DELETE_TIMELINE_BEGIN = "DELETE TIMELINE BEGIN";
export const DELETE_TIMELINE_SUCCESS = "DELETE TIMELINE SUCCESS"; 
export const DELETE_TIMELINE_ERROR = "DELETE TIMELINE ERROR";

export const loadTimeLines = ( ) => {
    return dispatch => {
         dispatch({ type: LOAD_TIMELINES_BEGIN });
         return get(`/timelines`)
          .then( timelines => { 
            dispatch({ type: LOAD_TIMELINES_SUCCESS, payload: timelines }); 
           }).catch( error => {
            dispatch({ type: LOAD_TIMELINES_ERROR , error });
           }); 
    };
};

export const loadTimeLinesByTimeLineId = ( timeLineId ) => {
    return dispatch => {
         dispatch({ type: LOAD_TIMELINES_BEGIN });
         return getById( timeLineId, `/timeLines/timelines?timeLineId=` )
          .then( timelines => {           
            dispatch({ type: LOAD_TIMELINES_SUCCESS, payload: timelines }); 
           }).catch( error => {
             dispatch({ type: LOAD_TIMELINES_ERROR , error });
           });         
    };
};

export const addNewTimeLine = ( timeLineName, groups, items, operatorId  ) => {
    return dispatch => {
       dispatch({ type: ADD_NEW_TIMELINE_BEGIN });
        return add({ timeLineName, groups, items, operatorId }, '/timelines' )
        .then( timelines => { 
          dispatch({ type: ADD_NEW_TIMELINE_SUCCESS, payload: timelines });
         })
         .catch( error => {
          dispatch({ type: ADD_NEW_TIMELINE_ERROR , error });
         });   
    };
};

export const saveTimeLine = ( timeline ) => {
   return dispatch => {
        dispatch({ type: SAVE_TIMELINE_BEGIN });
        return update( timeline, `/timelines/` )
         .then( timeline => {  
             dispatch({        
              type: SAVE_TIMELINE_SUCCESS, payload: timeline }); 
          }).catch( error => {
              dispatch({ type: SAVE_TIMELINE_ERROR , error });
          });  
   };
};

export const deleteTimeLine = timeLine => {
   return dispatch => {
       dispatch({ type: DELETE_TIMELINE_BEGIN });
        return remove( timeLine, `/timelines/` )
        .then( () => {
            dispatch({ type: DELETE_TIMELINE_SUCCESS, payload: timeLine });
        }).catch( error => {
            dispatch({ type: DELETE_TIMELINE_ERROR , error });
        });
   };
};
