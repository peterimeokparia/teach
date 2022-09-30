import { navigate } from "@reach/router";
import { elementMeta } from "services/course/pages/QuestionsPage/helpers";
import { saveOutcome, loadOutcomeByOutcomeId } from "services/course/actions/outcomes";
export function redirectToFurtherStudyQuestions( store, actionType, formData ){
    try {
      const operatorBusinessName = formData?.operatorBusinessName;
      const formType = formData?.formType;
      const outcomeType = formData?.outcomeType;
      const outcomeName = formData?.outcomeName;
      const courseId = formData?.courseId;
      const lessonId = formData?.lessonId;
      const outcomeId = formData?.outcomeId;
      const formBuilderState = elementMeta.state.Taking;
      const formBuilderStatus = elementMeta.status.InProgress;

      navigate(`/${operatorBusinessName}/formBuilder/${formType}/outcomeType/${outcomeType}/outcomeName/${outcomeName}/state/${formBuilderState}/status/${formBuilderStatus}/courseid/${courseId}/lessonid/${lessonId}/outcomeId/${outcomeId}`);       
    } catch (error) {
      console.log(' no form data');
    }
  }
  
  export function deleteQuestionIdFromOutcomeLink( store, formData ) {
    try {
      const questionId = formData?._id;
      const questionOutcomeId = formData?.outcomeId;
      const outcome = Object.values( store?.getState()?.outcomes?.outcomes )?.find(outcome => outcome?._id === questionOutcomeId);
      const links = outcome?.links?.map( link => updateOutcomeLinks(link, questionId, outcome) );

      if ( links ) {
        store.dispatch( saveOutcome({ ...outcome, links }) );
        store.dispatch( loadOutcomeByOutcomeId( outcome?._id ) );
      }
    } catch (error) {
      console.log(' no form data');
    }
  }

  function updateOutcomeLinks( link, questionId, outcome ) {
    if ( !link?.questions?.includes( questionId ) ) {
      return undefined;
    }

    let updatedOutcome = { ...outcome };

    if ( link?.questions?.includes( questionId ) ) {
       
        let updatedLinkObject = updatedOutcome?.links?.find( _link => _link?.uniqueId === link?.uniqueId );

        let questions = link?.questions?.filter( _questionId => _questionId !== questionId );

          updatedLinkObject = { ...updatedLinkObject, questions };

        let linkIndex = updatedOutcome?.links?.findIndex( _link => _link?.uniqueId === link?.uniqueId );

          updatedOutcome?.links?.splice( linkIndex, 1, updatedLinkObject );

        return updatedOutcome;
    }
  }