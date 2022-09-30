import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { saveMissedAnswers } from "services/course/actions/missedanswers";

export function getMissedAnswers(  store, missedAnswerProps ) {
  if ( !missedAnswerProps  ) return;
  
  let { formType, formName, formUuId, courseId, lessonId, userId } = missedAnswerProps;

  const questions =  Object.values(store.getState()?.onlineQuestions?.onlineQuestions)?.filter( question => 
      question?.formType === formType 
          && question?.formName === formName  );

  const formFields = Object.values( store.getState()?.formFields?.formFields ).filter( field => field?.formType === formType && 
    field?.formName === formName );

  const formFieldAnswers = Object.values( store.getState()?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.formType === formType && 
    field?.formName === formName && field?.formUuId === formUuId && field?.userId === userId );
  
  let questionIds = questions?.map( question => question?._id );
  let fields = formFields?.filter( field => questionIds.includes(field?.questionId ))?.map(item => item?._id);
  let missedQuestionsCollection = [], leftUnAnsweredFormFields = [], missedQuestionIds = [], leftUnAnsweredQuestions = [];

  if ( formFieldAnswers?.length > 0 ) {
    let answersFilteredByFieldId = formFieldAnswers?.filter(ans => fields?.includes( ans?.fieldId ) && ans?.formUuId === formUuId );

    setMissedQuestionCollection( answersFilteredByFieldId, missedQuestionsCollection );

    let clonedAnswers = [ ...answersFilteredByFieldId ];

    filterAnswers( answersFilteredByFieldId, clonedAnswers );
   
    leftUnAnsweredFormFields = formFields?.filter(field => fields?.filter( fieldId => !clonedAnswers?.map(ans => ans?.fieldId )?.includes( fieldId ) )?.includes( field?._id ) &&
                               field?.answerKey !== null && !answersFilteredByFieldId?.map(ans => ans?.fieldId).includes( field?._id ) );
  }
  let props = {
    leftUnAnsweredQuestions, leftUnAnsweredFormFields, missedQuestionsCollection, questions, 
    formFieldAnswers, fields, courseId, lessonId, missedQuestionIds, store
  };
  
  saveMissedAnswerProps( props );
}

function setMissedQuestionCollection( answersFilteredByFieldId, missedQuestionsCollection ) {
  answersFilteredByFieldId?.forEach( ans => {    
    if ( ans?.inputType === inputType?.RadioButton &&
      ans?.selected === true && ans?.answerKey !== ans?.answer ) {
      missedQuestionsCollection?.push( ans );
    }
    if ( ans?.inputType === inputType?.CheckBox &&
      ans?.answerKey !== ans?.answer ) {
      missedQuestionsCollection?.push( ans );
    }
    if ( ans?.inputType === inputType?.DropDown &&
      ans?.answerKey !== null && ans?.answerKey !== ans?.answer ) {
      missedQuestionsCollection?.push( ans );
    }
    if ( ans?.inputType === inputType?.DraggableListItem &&
      ans?.selected === true && ans?.answerKey !== ans?.answer ) {
      missedQuestionsCollection?.push( ans );
    }
  });
}

function filterAnswers( answersFilteredByFieldId, clonedAnswers ){
  let answerIds = answersFilteredByFieldId?.forEach( ans => { 
    if ( ans?.inputType === inputType?.RadioButton &&
      ans?.selected === true &&  ans?.answerKey === ans?.answer ) {
      clonedAnswers = clonedAnswers?.filter( answer => answer?._id !== ans?._id  );
    }
    if ( ans?.inputType === inputType?.CheckBox &&
      ans?.answerKey === ans?.answer ) {
      clonedAnswers = clonedAnswers?.filter( answer => answer?._id !== ans?._id  );
    }
    if ( ans?.inputType === inputType?.DropDown &&
      ans?.answerKey !== null && ans?.answerKey === ans?.answer ) {
      clonedAnswers = clonedAnswers?.filter( answer => answer?._id !== ans?._id  );
    }
  });
}

function saveMissedAnswerProps(  props  ){
  let {
    leftUnAnsweredQuestions, leftUnAnsweredFormFields, missedQuestionsCollection, questions, 
    formFieldAnswers, fields, courseId, lessonId, missedQuestionIds, store
  } = props;

  if ( missedQuestionsCollection?.length > 0 ) {
    let missedQuestions = missedQuestionsCollection.map(ans => {
        return questions?.find( question => question?._id === ans?.questionId );
    });

    let unAnswerdQuestionIds = leftUnAnsweredFormFields.map( ans => ans?.questionId );

    leftUnAnsweredQuestions = questions?.filter( ans => unAnswerdQuestionIds?.includes( ans?._id ) );
    missedQuestions =  [ ...new Set([ ...missedQuestions, ...questions?.filter( ans => unAnswerdQuestionIds?.includes( ans?._id ) ) ] ) ];
    missedQuestionIds = missedQuestions?.map(item => item?._id );

    const answer = formFieldAnswers?.find(ans => fields?.includes( ans?.fieldId ) && ans?.formType !== "" && ans?.formName !== ""  );

    let props = {
        missedQuestions, missedQuestionIds, leftUnAnsweredFormFields, leftUnAnsweredQuestions, unAnswerdQuestionIds,
        answerFieldId: answer?.fieldId, answerFormType: answer?.formType, answerFormName: answer?.formName,
        answerFormUuId: answer?.formUuId, answerFormUserId: answer?.userId, courseId, lessonId
    };
    
    store.dispatch( saveMissedAnswers( props ) );
  };

}