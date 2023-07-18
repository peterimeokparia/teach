import produce from 'immer';

import {
ADD_EQUATION_BEGIN, 
ADD_EQUATION_SUCCESS, 
ADD_EQUATION_ERROR, 
LOAD_EQUATIONS_BEGIN, 
LOAD_EQUATIONS_SUCCESS, 
LOAD_EQUATIONS_ERROR,
SAVE_EQUATION_BEGIN,
SAVE_EQUATION_SUCCESS, 
SAVE_EQUATION_ERROR, 
DELETE_EQUATION_SUCCESS,
SET_SELECTED_EQUATION } from '../../actions/equations';

const initialState = {
    equations: {},
    equation: null,
    saveInProgress: false,
    onSaveError: null,
    equationsLoading: false,
    onEquationsError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case ADD_EQUATION_BEGIN:
        case SAVE_EQUATION_BEGIN:     
            draft.saveInProgress = true;
            draft.onSaveError = null;
        return;
        case ADD_EQUATION_SUCCESS:
        case SAVE_EQUATION_SUCCESS:     
             draft.saveInProgress = false;
             draft.equations[action.payload?.equation?._id] = action.payload?.equation;
             draft.isModalOpen = false;
        return;
        case ADD_EQUATION_ERROR:
        case SAVE_EQUATION_ERROR:     
             draft.onSaveError = action.error;
             draft.saveInProgress = false;
        return;
        case DELETE_EQUATION_SUCCESS:
             delete draft.equations[action.payload._id];
        return; 
        case LOAD_EQUATIONS_BEGIN:
            draft.equationsLoading = true;
        return;
        case LOAD_EQUATIONS_SUCCESS:
             draft.equationsLoading = false;
             draft.equations = action.payload;   
        return;
        case LOAD_EQUATIONS_ERROR:
             draft.onEquationsError = action.error;
             draft.equationsLoading = false;
        return;
        case SET_SELECTED_EQUATION:
            draft.equation = action.payload;
        return;
        default:
        return;
        
    }  
}, initialState);

export default reducer;