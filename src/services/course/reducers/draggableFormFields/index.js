import produce from 'immer';
import { SET_DRAGGABLE_FORMFIELDS } from 'services/course/actions/draggableFormFields';

const initialState = {
    draggableFormFields: [],
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case SET_DRAGGABLE_FORMFIELDS:
            draft.draggableFormFields = action.payload;
        return;
       default:
    return;

    }
}, initialState);

export default reducer;