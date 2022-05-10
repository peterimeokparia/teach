import {
add,
update,
remove,
get,
getById,
getPagedData } from 'services/course/api';

export const ADD_FORMBUILDER_BEGIN = "ADD FORMBUILDER BEGIN";
export const ADD_FORMBUILDER_SUCCESS = "ADD FORMBUILDER SUCCESS";
export const ADD_FORMBUILDER_ERROR = "ADD FORMBUILDER ERROR";
export const LOAD_FORMBUILDER_BEGIN = "LOAD FORMBUILDER BEGIN";
export const LOAD_FORMBUILDER_SUCCESS = "LOAD FORMBUILDER SUCCESS";
export const LOAD_FORMBUILDER_ERROR = "LOAD FORMBUILDER ERROR";
export const DELETE_FORMBUILDER_BEGIN = "DELETE FORMBUILDER BEGIN";
export const DELETE_FORMBUILDER_ERROR = "DELETE FORMBUILDER ERROR";
export const DELETE_FORMBUILDER_SUCCESS = "DELETE FORMBUILDER SUCCESS";
export const SAVE_FORMBUILDER_BEGIN = "SAVE FORMBUILDER BEGIN";
export const SAVE_FORMBUILDER_ERROR = "SAVE FORMBUILDER ERROR";
export const SAVE_FORMBUILDER_SUCCESS = "SAVE FORMBUILDER SUCCESS";
   
export const addNewFormBuilder = formBuiler => {
    return dispatch => {
        dispatch({ type: ADD_FORMBUILDER_BEGIN });
        return add( formBuiler, '/formbuilder')
        .then(builder => {
            dispatch({ type: ADD_FORMBUILDER_SUCCESS, payload: builder });
        }).catch( error => {
            dispatch({ type: ADD_FORMBUILDER_ERROR , error });
        });
    };
};

export const saveFormBuilder = ( formBuilder ) => {
    return dispatch => {
        dispatch({ type: SAVE_FORMBUILDER_BEGIN });
        return update( formBuilder, `/formbuilder/` )
            .then( builder => {  
             dispatch({ type: SAVE_FORMBUILDER_SUCCESS, payload: builder }); 
            }).catch( error => {
            dispatch({ type: SAVE_FORMBUILDER_ERROR , error });
        });  
    };
 };

export const loadFormBuilders = () => {
    return dispatch => {
        dispatch({ type: LOAD_FORMBUILDER_BEGIN });
        return get(`/formbuilder`)
          .then( formbuilder  => { 
             dispatch({ type: LOAD_FORMBUILDER_SUCCESS, payload: formbuilder }); 
           }).catch( error => {
            dispatch({ type: LOAD_FORMBUILDER_ERROR , error });
        });       
    };
  };

export const loadFormBuilderByFormBuilderId = ( formBuilderId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FORMBUILDER_BEGIN });
         return getById( formBuilderId, `/formbuilder/builder?formBuilderId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_FORMBUILDER_SUCCESS, payload: builder })
           }).catch( error => {
                dispatch({ type: LOAD_FORMBUILDER_ERROR , error });
           });       
    };
};

export const loadFormBuilderByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FORMBUILDER_BEGIN });
         return getById( userId, `/formbuilder/user?userId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_FORMBUILDER_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_FORMBUILDER_ERROR , error });
        });       
    };
};

export const loadPagedFormBuilders = ( formType, page, limit ) => { 
    return dispatch => {
        return getPagedData( `/formbuilder/pagedRoute?id=${formType}&page=${page}&limit=${limit}`)
        .then( form => {
            dispatch({ type: LOAD_FORMBUILDER_SUCCESS, payload: form });
            return form;
        }).catch( error => {
            dispatch({ type: LOAD_FORMBUILDER_ERROR , error });
            return error;
        });
    };
};

export const deleteFormBuilder = formbuilder => {
    return dispatch => {
        dispatch({ type: DELETE_FORMBUILDER_BEGIN });
            return remove( formbuilder, `/formbuilder/` )
            .then( (response ) => {
                dispatch({ type: DELETE_FORMBUILDER_SUCCESS, payload: formbuilder });
            }).catch( error => {
            dispatch({ type: DELETE_FORMBUILDER_ERROR , error });
        });
    };
};
