import { navigate } from "@reach/router";
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { addMissedAnswers } from 'services/course/actions/missedanswers';
import { setIsMaxQuestionDialogOpen } from 'services/course/actions/formbuilders';
import { setQuestionProperties } from 'services/course/actions/onlinequestions';

export function handleRedirection( store, actionType, formData ) {
    try {
        let formBuilderQuestionProperties = getFormBuilderProperties( store, actionType, formData );
    
        let { formType } = formBuilderQuestionProperties;
    
        store?.dispatch( setQuestionProperties( formBuilderQuestionProperties ) );
    
        switch (formType) {
          case formTypes?.survey:
            handleSurveys( formBuilderQuestionProperties, store, actionType, formData );
            break;
          case formTypes?.report:  
            handleReports( formBuilderQuestionProperties, store, actionType, formData );
            break;
          case formTypes?.quizzwithpoints:
          case formTypes?.homework:  
            handleQuizz( formBuilderQuestionProperties, store, actionType, formData );
            break;
          case formTypes?.furtherstudy:
            handleFurtherStudy( formBuilderQuestionProperties, store, actionType, formData );
            break;  
          case formTypes?.examwithpoints:
            handleExams( formBuilderQuestionProperties, store, actionType, formData );
            break;
          default:
            break;
        }
      } catch (error) {
        console.log('no form data');
      }
}

function handleSurveys( navProps, store, actionType, formData ){
    let {
        operatorBusinessName, formType, formName, formUuId, outcomeId,
        userId, formBuilderStatus, formBuilderState, eventId, courseId, lessonId
    } = navProps;

    navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/${formUuId}/${userId}/${formBuilderState}/${formBuilderStatus}`);
}

function handleReports( navProps, store, actionType, formData ){
    let {
        operatorBusinessName, formType, formName, formUuId, outcomeId,
        userId, formBuilderStatus, formBuilderState, eventId, courseId, lessonId
    } = navProps;

    if ( formBuilderStatus === elementMeta.state.Manage ) {
        navigate(`/${operatorBusinessName}/formEventBuilder/${formType}/${formName}/${formUuId}/${userId}/${formBuilderState}/${formBuilderStatus}/${eventId}`);
        return;
    }

    navigate(`/${operatorBusinessName}/formEventBuilder/${formType}/${formName}/${formUuId}/${userId}/${formBuilderState}/${formBuilderStatus}/${eventId}`);
}

function handleQuizz( navProps, store, actionType, formData ){
    let {
        operatorBusinessName, formType, formName, formUuId, outcomeId,
        userId, formBuilderStatus, formBuilderState, eventId, courseId, lessonId
    } = navProps;

    let props = { formType,
        formName, formUuId, courseId, lessonId,outcomeId, userId
    };

    handleMissedAnswers( store, props );
    store.dispatch( setIsMaxQuestionDialogOpen(false) );
    navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/course/${courseId}/lesson/${lessonId}/${formUuId}/user/${userId}/state/${formBuilderState}/status/${formBuilderStatus}/event/${eventId}/outcome/${outcomeId}`);
}

function handleMissedAnswers( store, props ){
    store.dispatch( addMissedAnswers(props) );
}

function handleFurtherStudy( navProps, store, actionType, formData ){
    let {
        operatorBusinessName, formType, formName, formUuId, outcomeId,
        userId, formBuilderStatus, formBuilderState, eventId, courseId, lessonId
    } = navProps;

    let { linkId } = formData;

    store.dispatch( setIsMaxQuestionDialogOpen(false) );
    navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/course/${courseId}/lesson/${lessonId}/${formUuId}/user/${userId}/state/${formBuilderState}/status/${formBuilderStatus}/event/${eventId}/outcome/${outcomeId}/linkId/${linkId}`);
}

function handleExams( navProps, store, actionType, formData ){
    let {
        operatorBusinessName, formType, formName, formUuId, outcomeId,
        userId, formBuilderStatus, formBuilderState, eventId, courseId, lessonId
    } = navProps;

    //change
    navigate(`/${operatorBusinessName}/formBuilder/${formType}/${formName}/${courseId}/${formUuId}/${userId}/${formBuilderState}/${formBuilderStatus}/${eventId}`);
}

export function getFormBuilderProperties( store, actionType, formData ){
    const operatorBusinessName = formData?.operatorBusinessName;
    const formType = formData?.formType;
    const formName = formData?.formName;
    const formDisplayName = formData?.formDisplayName;
    const formUuId = formData?.formUuId;
    const formId = !formData?.formId ? '000' : formData?.formId;
    const lessonData = getLessonDataFromFormId(store, formId);
    const courseId = ( !formData?.courseId && lessonData ) ? lessonData?.courseId : formData?.courseId;
    const lessonId = ( !formData?.lessonId  && lessonData ) ? lessonData?.lessonId : formData?.lessonId;
    const createDateTime = formData?.createDateTime;
    const takingDateTime = formData?.takingDateTime;
    const createdBy = formData?.createdBy;
    const formBuilderState = formData?.state;
    const formBuilderStatus = formData?.status;
    const eventId = !formData?.eventId ? '000' : formData?.eventId;
    const userId = formData?.userId;
    const outcomeId = formData?.outcomeId;
  
    let formBuilderQuestionProperties = { 
      operatorBusinessName, formType, formName, formDisplayName,
      courseId, lessonId, formUuId, formId, createDateTime, outcomeId, takingDateTime, 
      createdBy, userId, formBuilderStatus, formBuilderState, eventId
    };
  
    return formBuilderQuestionProperties;
  }
  
  function getLessonDataFromFormId(store, formId) {
    if ( !formId ) return;
    
    let lesson = Object.values( store?.getState()?.lessons?.lessons )?.find(lesson => lesson?._id === formId );
  
    if ( !lesson ) {
      return undefined;
    }
  
    return { courseId: lesson?.courseId, lessonId: lesson?._id };
  }