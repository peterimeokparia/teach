import { deleteOnlineQuestion, updateContentOnDelete, DELETE_ONLINE_QUESTION_ELEMENTS } from 'services/course/actions/onlinequestions';
import Swal from 'sweetalert2';

export const deleteQuestion = ( store, props ) => {
    let { selectedQuestion } = props;
    let { dispatch } = store;

    Swal.fire({
        title: 'Confirm Delete',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: ( true ),
        confirmButtonText: 'Ok',
        confirmButtonColor: '#673ab7',
        cancelButtonText: 'No'
        })
        .then( (response) => {
            if ( response?.value ) {
                dispatch({type: DELETE_ONLINE_QUESTION_ELEMENTS, payload: selectedQuestion})
                dispatch( deleteOnlineQuestion( selectedQuestion ) );
                dispatch( updateContentOnDelete() );
            } else {
                return;
        } }).catch(error =>{   
            throw Error(`Failed to delete question. ${error}`);
    });
}