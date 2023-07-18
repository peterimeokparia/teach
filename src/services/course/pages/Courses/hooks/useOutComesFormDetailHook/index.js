import { saveOutcome, loadOutcomeByOutcomeId } from 'services/course/actions/outcomes';
import { useDispatch } from 'react-redux'; 
import Swal from 'sweetalert2/dist/sweetalert2.js';

const useOutComesFormDetailHook = (lessonOutcome) => {
    const dispatch = useDispatch();

    function addConcept( concept ){
        if ( lessonOutcome?.lessonConcepts?.find( item => item?.concept === concept ) ) {
            Swal.fire({
                title: `Please select existing concept`,
                icon: 'info',
                confirmButtonText: 'OK',
                confirmButtonColor: '#c244d8'
            });
        }
        
        if ( !lessonOutcome?.lessonConcepts?.find( item => item?.concept === concept ) ) {
            dispatch( saveOutcome({...lessonOutcome, lessonConcepts: [ ...lessonOutcome?.lessonConcepts, { type:'concept', concept, id: lessonOutcome?._id } ] }) );
        }
        dispatch( loadOutcomeByOutcomeId( lessonOutcome?._id ) );
    }
    
    function removeConcept( conceptToRemove ) {
        let updatedConcepts = lessonOutcome?.lessonConcepts?.filter( concept => concept?.concept !== conceptToRemove );
    
        dispatch( saveOutcome({...lessonOutcome, lessonConcepts: updatedConcepts }) );
        dispatch( loadOutcomeByOutcomeId( lessonOutcome?._id ) );
    }
    
    function addLink( title, link, concept, type, uniqueId) {
        if ( !lessonOutcome?.lessonConcepts?.find( item => item?.concept === concept ) ) {
            dispatch( saveOutcome({...lessonOutcome, lessonConcepts: [ ...lessonOutcome?.lessonConcepts, { type:'concept', concept, id: lessonOutcome?._id } ], links: [ ...lessonOutcome?.links, { type, link, title, concept,  id: lessonOutcome?._id, uniqueId } ] }) );
        } else {
            dispatch( saveOutcome({...lessonOutcome, lessonConcepts: lessonOutcome?.lessonConcepts, links: [ ...lessonOutcome?.links, { type, link, title, concept,  id: lessonOutcome?._id, uniqueId } ] }) );
        }
        dispatch( loadOutcomeByOutcomeId( lessonOutcome?._id ) );
    }
    
    function removeLink( uniqueIdToRemove ) {
        let updatedLinks = lessonOutcome?.links?.filter( link => link?.uniqueId !== uniqueIdToRemove );
    
        dispatch( saveOutcome({...lessonOutcome, links: updatedLinks }) );
        dispatch( loadOutcomeByOutcomeId( lessonOutcome?._id ) );
    }
    
    function onSubmitTest(e){
        e?.preventDefault();
    }

return { 
  outcomeFormDetail: { 
   addConcept, removeConcept, addLink, removeLink, onSubmitTest
  }
 }; 
}

export default useOutComesFormDetailHook;