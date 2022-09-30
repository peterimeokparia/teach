import { addNewFormField, deleteFormField, saveFormField, setSelectedFormField, loadFormFieldsByQuestionId, loadFormFieldsByFormFieldId,
    loadFormFields } from 'services/course/actions/formfields';
import { addNewFormFieldAnswer, deleteFormFieldAnswer, saveFormFieldAnswer, saveFormFieldAnswerByFieldId, saveStudentsAnswerPoints, loadFormFieldAnswersByQuestionId,
    loadFormFieldAnswersByFormFieldId, loadFormFieldAnswers, saveDraggableFormFieldAnswer } from 'services/course/actions/formfieldanswers';
import { addNewFormFieldPoint, deleteFormFieldPoints, saveFormFieldPoint, 
    saveFormFieldPointsByFieldId, loadFormFieldPoints } from 'services/course/actions/formquestionpoints';
import { saveEditorMarkDownObjectToMw } from 'services/course/actions/editor';
import { setDraggableFormFields } from 'services/course/actions/draggableFormFields';
import { loadOnlineQuestionsByQuestionId } from 'services/course/actions/onlinequestions';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';

export const mapDispatch = {
    setDraggableFormFields,
    addNewFormField,
    setSelectedFormField,
    saveFormField,
    loadFormFields,
    loadFormFieldAnswersByQuestionId,
    loadFormFieldsByQuestionId,
    loadFormFieldsByFormFieldId,
    deleteFormField,
    addNewFormFieldAnswer,
    deleteFormFieldAnswer,
    saveFormFieldAnswer,
    saveDraggableFormFieldAnswer,
    saveFormFieldAnswerByFieldId,
    loadFormFieldAnswersByFormFieldId,
    loadFormFieldAnswers,
    saveEditorMarkDownObjectToMw,
    addNewFormFieldPoint,
    deleteFormFieldPoints,
    saveFormFieldPoint,
    saveFormFieldPointsByFieldId,
    loadFormFieldPoints,
    saveStudentsAnswerPoints,
    loadOnlineQuestionsByQuestionId
  };
  
  export const mapState = ( state, ownProps ) => { 
    return {
      currentUser: state.users.user,
      draggableFormFieldCollection: Object.values( state?.formFields?.formFields ).filter( field => field?.formName === ownProps?.form?.formName && field?.inputType === inputType.DraggableListItem ),
      fields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.form?.question?._id ),
      formFieldsLoading: state?.formFields?.formFieldsLoading,
      onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
      formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.form?.question?._id ),
      formFieldAnswersError: state?.formFieldAnswers?.onSaveError,
      formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
      onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
      formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.form?.question?._id ),
      missedQuestions: state?.missedQuestions?.missedQuestions,
      selectedFormField: state?.formFields?.selectedFormField,
      draggableFormFields: state?.draggableFormFields?.draggableFormFields,
      studentsTotalPointsReceived: Object?.values( state?.formFieldAnswers?.studentsCummulativePointsRecieved )?.find( field => field?.formName === ownProps?.form?.formName && field?.formUuId === ownProps?.form?.formUuId && field?.userId === ownProps?.form?.userId ),
      studentsTotalPointsReceivedFromPersistence: Object?.values( state?.formFieldPoints?.studentsCummulativePointsRecieved )?.find( field => field?.formName === ownProps?.form?.formName && field?.formUuId === ownProps?.form?.formUuId && field?.userId === ownProps?.form?.userId ),
    };
  };