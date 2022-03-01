import {
add,
update,
remove,
get } from 'services/course/api';

export const ADD_CLASSGRADE_BEGIN = "ADD CLASSGRADE BEGIN";
export const ADD_CLASSGRADE_SUCCESS = "ADD CLASSGRADE SUCCESS";
export const ADD_CLASSGRADE_ERROR = "ADD CLASSGRADE ERROR";
export const LOAD_CLASSGRADE_BEGIN = "LOAD CLASSGRADE BEGIN";
export const LOAD_CLASSGRADE_SUCCESS = "LOAD CLASSGRADE SUCCESS";
export const LOAD_CLASSGRADE_ERROR = "LOAD CLASSGRADE ERROR";
export const DELETE_CLASSGRADE_BEGIN = "DELETE CLASSGRADE BEGIN";
export const DELETE_CLASSGRADE_ERROR = "DELETE CLASSGRADE ERROR";
export const DELETE_CLASSGRADE_SUCCESS = "DELETE CLASSGRADE SUCCESS";
export const SAVE_CLASSGRADE_BEGIN = "SAVE CLASSGRADE BEGIN";
export const SAVE_CLASSGRADE_ERROR = "SAVE CLASSGRADE ERROR";
export const SAVE_CLASSGRADE_SUCCESS = "SAVE CLASSGRADE SUCCESS";
   
export const addNewClassGrade = classGrade => {
    return dispatch => {
        dispatch({ type: ADD_CLASSGRADE_BEGIN });
        return add( classGrade, '/classgrades')
        .then(classgrade => {
            dispatch({ type: ADD_CLASSGRADE_SUCCESS, payload: classgrade });
        }).catch( error => {
            dispatch({ type: ADD_CLASSGRADE_ERROR , error });
        });
    };
};

export const saveClassGrade = ( classGrade ) => {
    return dispatch => {
        dispatch({ type: SAVE_CLASSGRADE_BEGIN });
        return update( classGrade, `/classgrades/` )
            .then( classgrade => {  
             dispatch({ type: SAVE_CLASSGRADE_SUCCESS, payload: classgrade }); 
            }).catch( error => {
            dispatch({ type: SAVE_CLASSGRADE_ERROR , error });
        });  
    };
 };

export const loadClassGrades = () => {
    return dispatch => {
        dispatch({ type: LOAD_CLASSGRADE_BEGIN });
        return get(`/classgrades`)
          .then( classgrade  => { 
             dispatch({ type: LOAD_CLASSGRADE_SUCCESS, payload: classgrade }); 
           }).catch( error => {
            dispatch({ type: LOAD_CLASSGRADE_ERROR , error });
        });       
    };
};

export const deleteClassGrade = classGrade => {
    return dispatch => {
        dispatch({ type: DELETE_CLASSGRADE_BEGIN });
            return remove( classGrade, `/classgrades/` )
            .then( (response ) => {
                dispatch({ type: DELETE_CLASSGRADE_SUCCESS, payload: classGrade });
            }).catch( error => {
            dispatch({ type: DELETE_CLASSGRADE_ERROR , error });
        });
    };
};
