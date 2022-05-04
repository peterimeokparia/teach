import {
add,
addEncrypted,
getDecrypted,
update,
get,
getById,
remove } from 'services/course/api';

export const ADD_CONFIG_BEGIN="ADD CONFIG BEGIN";
export const ADD_CONFIG_SUCCESS="ADD CONFIG SUCCESS";
export const ADD_CONFIG_ERROR="ADD CONFIG ERROR";
export const SAVE_CONFIG_BEGIN="SAVE CONFIG BEGIN";
export const SAVE_CONFIG_SUCCESS="SAVE CONFIG SUCCESS";
export const SAVE_CONFIG_ERROR="SAVE CONFIG ERROR";
export const LOAD_CONFIGS_BEGIN="LOAD CONFIGS BEGIN";
export const LOAD_CONFIGS_SUCCESS="LOAD CONFIGS SUCCESS";
export const LOAD_CONFIGS_ERROR="LOAD CONFIGS ERROR";
export const DELETE_CONFIG_BEGIN="DELETE CONFIG BEGIN";
export const DELETE_CONFIG_SUCCESS="DELETE CONFIG SUCCESS";
export const DELETE_CONFIG_ERROR="DELETE CONFIG ERROR";

export const addConfig = (config) => {
   return dispatch => {
        dispatch({ type: ADD_CONFIG_BEGIN });
        return add(config)
        .then( config => {
            dispatch({ type: ADD_CONFIG_SUCCESS, payload: config });
            return config;
        })
        .catch( error => {
            dispatch({ type: ADD_CONFIG_ERROR , error });
            return error;
         });
    };
};

//{data: data}
export const encryptData = (config) => {
    return dispatch => {
         dispatch({ type: ADD_CONFIG_BEGIN });
         return addEncrypted(config)
         .then( config => {
             dispatch({ type: ADD_CONFIG_SUCCESS, payload: config });
             return config;
         })
         .catch( error => {
             dispatch({ type: ADD_CONFIG_ERROR , error });
             return error;
          });
     };
 };

 //unHarshedPrivateKey
 export const decryptData = (config) => {
    return dispatch => {
         dispatch({ type: LOAD_CONFIGS_BEGIN });
         return getDecrypted(config)
         .then( config => {
             dispatch({ type: LOAD_CONFIGS_SUCCESS, payload: config });
             return config;
         })
         .catch( error => {
             dispatch({ type: LOAD_CONFIGS_ERROR , error });
             return error;
          });
     };
 };

export const loadConfigs = () => {
    return dispatch => {
        dispatch({ type: LOAD_CONFIGS_BEGIN });
        get(`/configs`)
        .then( users => {
            dispatch({ type: LOAD_CONFIGS_SUCCESS, payload: users });
        }).catch( error => {
            dispatch({ type: LOAD_CONFIGS_ERROR, error });
        });
    };
};

export const saveConfig = ( config ) => {
    return dispatch => {
        dispatch({ type: SAVE_CONFIG_BEGIN });
            return update( config, `/configs/` )
            .then( user => {  
                dispatch({ type: SAVE_CONFIG_SUCCESS, payload: config });
            })
            .catch( error => {
                dispatch({ type: SAVE_CONFIG_ERROR , error });
        });  
    };
};

export const deleteConfig = ( config ) => {
    return dispatch => {
        return remove( config, `/configs/` )
        .then( response => {
            dispatch({ type: DELETE_CONFIG_SUCCESS, payload: config });
            return config;
        })
        .catch(error => {
            dispatch({ type: DELETE_CONFIG_ERROR, error });
        });
    };
};

export const getConfigById = ( config ) => {
    return dispatch => {
        return getById( config?._id, '/configs/config?id=' )
         .then( config => {
             dispatch({ type: LOAD_CONFIGS_SUCCESS, payload: config} );
         })
          .catch( error => {
              dispatch({ type: LOAD_CONFIGS_ERROR, payload: error } );
          });
    };
};