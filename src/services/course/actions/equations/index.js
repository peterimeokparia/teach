import { add, update, remove, get } from 'services/course/api/index.js';

export const ADD_EQUATION_BEGIN = "ADD EQUATION BEGIN";
export const ADD_EQUATION_SUCCESS = "ADD EQUATION SUCCESS";
export const ADD_EQUATION_ERROR = "ADD EQUATION ERROR";
export const LOAD_EQUATIONS_BEGIN = "LOAD EQUATIONS BEGIN";
export const LOAD_EQUATIONS_SUCCESS = "LOAD EQUATIONS SUCCESS";
export const LOAD_EQUATIONS_ERROR = "LOAD EQUATIONS ERROR";
export const SAVE_EQUATION_BEGIN = "SAVE EQUATION BEGIN";    
export const SAVE_EQUATION_SUCCESS = "SAVE EQUATION SUCCESS";
export const SAVE_EQUATION_ERROR = "SAVE EQUATION ERROR";
export const DELETE_EQUATION_BEGIN = "DELETE EQUATION BEGIN";
export const DELETE_EQUATION_SUCCESS = "DELETE EQUATION SUCCESS";
export const DELETE_EQUATION_ERROR = "DELETE EQUATION ERROR";
export const SET_SELECTED_EQUATION = "SET SELECTED EQUATION";

export const addNewEquation = ( newEquation ) => {
    return dispatch => {   
       dispatch({ type: ADD_EQUATION_BEGIN });
       return add(newEquation, '/equations')
        .then(equation => {
           dispatch({ type: ADD_EQUATION_SUCCESS, payload: equation  }); 
        })
         .catch(error => { 
            dispatch({ type: ADD_EQUATION_ERROR, error });
        });
    };
};

export const saveEquation = ( equation ) => {
    return dispatch => {
        dispatch({ type: SAVE_EQUATION_BEGIN });
        return update( equation, `/equations/`)
            .then( equation => { 
                dispatch({        
                type: SAVE_EQUATION_SUCCESS, payload: equation }); 
            }).catch( error => {
                dispatch({ type: SAVE_EQUATION_ERROR , error });
        });
    };
};

export const deleteEquation = equation => {
   return dispatch => {
       dispatch({ type: DELETE_EQUATION_BEGIN });
        return remove( equation, `/equations/`)
        .then( () => {
            dispatch({ type: DELETE_EQUATION_SUCCESS, payload: equation });
        })
          .catch( error => {
              dispatch({ type: DELETE_EQUATION_ERROR , error });
        });
   };
};

export const loadEquations = () => {
    return dispatch => {
        dispatch({ type: LOAD_EQUATIONS_BEGIN });
        get(`/equations`)
        .then( equation => {
            dispatch({ type: LOAD_EQUATIONS_SUCCESS, payload: equation });
        })
        .catch( error => {
            dispatch({ type: LOAD_EQUATIONS_ERROR , error });
        });
    };
};

export const setSelectedEquation = ( equation ) => ({
    type:SET_SELECTED_EQUATION, payload: equation
});

