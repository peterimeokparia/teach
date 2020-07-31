import produce from 'immer';
import { TOGGLE_PREVIEW_MODE } from '../services/course/actions';

const initialState = {
    previewMode : false
}


const reducer = produce((draft, action) => {

      switch ( action.type ) {

          case TOGGLE_PREVIEW_MODE:
             draft.previewMode = ! draft.previewMode;
             return

          default:
              break;
      }

}, initialState);



export default reducer;