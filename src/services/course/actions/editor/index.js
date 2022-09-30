import { update } from 'services/course/api';

export const saveEditorMarkDownObjectToMw = markDownContent => ({
    type: markDownContent?.actionType,
    payload: markDownContent
});

let timerHandle = null;

export const setMarkDown = ( actionType, route, payload, interval ) => {
    return ( dispatch, getState )  => { 
    if ( timerHandle ){
        clearTimeout( timerHandle );
    }
    timerHandle = setTimeout(() => {
        dispatch({ type: actionType, payload });
        update( payload, route );  
    }, interval);  
 };
};
