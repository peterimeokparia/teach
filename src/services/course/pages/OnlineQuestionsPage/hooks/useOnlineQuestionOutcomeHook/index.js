import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setQuestionProperties } from 'services/course/actions/onlinequestions';
import { setIsMaxQuestionDialogOpen } from 'services/course/actions/formbuilders';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import Swal from 'sweetalert2';

function useOnlineQuestionOutcomeHook( onlineQuestionsConfig ){
    const dispatch = useDispatch();
    const [ isOnBlur, setOnBlur ] = useState( false );

    let {
        toggleContentChanged, onlineQuestionProperties
    } = onlineQuestionsConfig;
                  
    function updateQuestionOutcomeId( outcome, setQuestionOutcome, setIsDrawerOpen ) {
       try {
            if ( isEmptyObject( outcome ) ) throw Error('No outcome specified!');

            if ( isEmptyObject( onlineQuestionProperties ) ) throw Error('No onlineQuestionProperties specified!');

            setQuestionOutcome( outcome );
            dispatch( setQuestionProperties({ ...onlineQuestionProperties, outcomeId: outcome?._id }) );
            dispatch( setIsMaxQuestionDialogOpen( true ) );
            setIsDrawerOpen( false );
            toggleContentChanged(); 

       } catch (error) {
            console.log( error?.message );
            return false;
       }
       return true;
    }

    function verifyOutcome( config, setIsDrawerOpen ) {
        let { formType, outcomeId } = config; 

        if ( ( outcomeId === "undefined" ||  outcomeId === undefined ) && formType === formTypes.quizzwithpoints ) {
            Swal.fire({
                title: 'Please specify an outcome',
                icon: 'warning',
                showCancelButton: false,
                showConfirmButton: ( true ),
                confirmButtonText: 'OK',
                confirmButtonColor: '#673ab7',
                cancelButtonText: 'No'
                });
                setIsDrawerOpen( true );
            return false;
        };
        return true;
    }

    function toggleConcepts( blur ) {
        setOnBlur( blur );
    }

return {
    verifyOutcome,
    updateQuestionOutcomeId,
    toggleConcepts,
}; };

export default useOnlineQuestionOutcomeHook;

