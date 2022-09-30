import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveOnlineQuestions } from 'services/course/actions/onlinequestions';
import { loadOutcomesByLessonId } from 'services/course/actions/outcomes';

const useMeasurableOutcomeHook = ( previewMode, lessonId, selectedQuestion ) => {
    const [ measurableOutcomes, setMeasurableOutcomes ] = useState( ( selectedQuestion?.assignedOutcomes?.length > 0 ) ? selectedQuestion?.assignedOutcomes : [] );
    const [ closeModal, setCloseModal ] = useState( false );
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch( loadOutcomesByLessonId( lessonId ) );
    }, [ dispatch, lessonId ] );

    function handleOutcomeSelection( e, question ){
        try {
          let status =  e?.target?.checked;
          let value = e?.target?.value;
          let assignedOutcomes = [];
         
          ( status && value  ) 
            ?  assignedOutcomes = [ ...measurableOutcomes, value ]
            :  assignedOutcomes = measurableOutcomes?.filter( val => value !== val );

            setMeasurableOutcomes( assignedOutcomes  );
            dispatch( saveOnlineQuestions( { ...question, assignedOutcomes } ) );
        } catch ( error ) {
          console.warn( `Problem reading value ${error}` );
        }
      }

      function handleModalClose(e) {
        setCloseModal( true );
      }

    return {
      measurableOutcomes,
      closeModal,
      handleModalClose,
      handleOutcomeSelection,
    };
};

export default useMeasurableOutcomeHook;

