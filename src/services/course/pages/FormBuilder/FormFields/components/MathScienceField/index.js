import 
react, { 
useState } from 'react';

import { 
connect } from 'react-redux';
    
import {
loadFormFields,
saveFormField } from 'services/course/actions/formfields';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
elementMeta, inputType } from 'services/course/pages/QuestionsPage/helpers';

import Latex from "react-latex";
import MathScienceLatex from 'services/course/pages/OnlineQuestionsPage/components/MathScienceLatex';
import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import './style.css';

const MathScienceField = ( { 
    fieldProps,
    previewMode, 
    currentUser,
    formFieldElement,
    elememtFormFields,
    formFields,
    setSelected,
    studentsAnswer,
    formFieldAnswers,
    checkBoxFormFields,
    saveOnlineQuestions,
    loadFormFields,
    saveFormField } ) => {

      const [ mathModalOpen, setMathModalOpen ] = useState(false);
    
    let {
      formBuilderStatus,
      handleSelectorFormFieldAnswers,
    } = fieldProps;

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField, previewMode }  );
return(
    <>
      { ( previewMode ) &&
      <div className={"on-top"}>
        <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement, setMathModalOpen, previewMode } } >
          {

              <Latex>{`View: $${formFieldElement?.inputValue}$`}</Latex> 

          }
          { mathModalOpen &&   
                <MathScienceLatex 
                  previewMode={previewMode} 
                  formElement={formFieldElement}
                  saveMathScienceFormField={saveFormField}
                  loadMathScienceFormField={loadFormFields}
               />
          }
        </FormFieldPanel>
       </div>
      }
    </>
    )
};

 const mapDispatch = {
    loadFormFields,
    saveFormField,
    saveOnlineQuestions
  };
  
  const mapState = ( state, ownProps ) => { 
    return {
      currentUser: state.users.user,
      currentUsers: Object.values( state.users.users ),
      elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
      formFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
      formFieldsLoading: state?.formFields?.formFieldsLoading,
      onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
      formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
      formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
      onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
      formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
      studentsAnswer: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ).
                            find( field => field?.fieldId === ownProps?.formFieldElement?._id  && field?.formName === ownProps?.formFieldElement?.formName 
                              && field?.formUuId === ownProps?.fieldProps?.formUuId && field?.userId === (ownProps?.fieldProps?.userId ? ownProps?.fieldProps?.userId : ownProps?.currentUser?._id)),
    };
  };

export default connect( mapState, mapDispatch )(MathScienceField);