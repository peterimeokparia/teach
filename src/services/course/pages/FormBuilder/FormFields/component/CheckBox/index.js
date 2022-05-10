import 
react, { 
useState } from 'react';

import { 
connect } from 'react-redux';
    
import {
saveFormField, loadFormFields } from 'services/course/actions/formfields';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
elementMeta, 
inputType } from 'services/course/pages/QuestionsPage/helpers';

import { 
getFormFieldAnswersByQuestionId } from 'services/course/selectors';

import MathScienceLatex from 'services/course/pages/OnlineQuestionsPage/components/MathScienceLatex';
import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import useFormFieldAnswersHook from 'services/course/pages/FormBuilder/hooks/useFormFieldAnswersHook';

const CheckBox = ( { 
    fieldProps,
    previewMode, 
    currentUser,
    formFieldElement,
    elememtFormFields,
    formFields,
    setSelected,
    formFieldAnswers,
    checkBoxFormFields,
    saveOnlineQuestions,
    studentAnswerByQuestionId,
    loadFormFields,
    saveFormField } ) => {
    
    const [ inputValue, setInputValue ] = useState('');
    const checkBoxGroup = formFields?.filter( field => field?.parentComponentId === formFieldElement?.parentComponentId && field?.inputType === inputType.CheckBox );
    const [ mathModalOpen, setMathModalOpen ] = useState(false);

    let {
      formBuilderStatus,
      handleSelectorFormFieldAnswers,
    } = fieldProps;

    let {
      studentsAnswers
    } = useFormFieldAnswersHook( studentAnswerByQuestionId );

    const [checkedRadioButton, setCheckedRadioButton ] = useState( ( formBuilderStatus === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {} );

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField, previewMode, fieldGroup: checkBoxGroup }  );

    const handleCheckBoxSelection = ( e ) => {

        setCheckedRadioButton( { id: formFieldElement?._id, isChecked: e?.target.checked } );

        if ( e?.target?.checked && e?.target?.value ) {

             handleSelectorFormFieldAnswers( formFieldElement, e?.target?.value,  e?.target?.value,  e?.target?.checked,  formFieldElement['points'] );

        } else {

            const currentField = formFields?.find( field => field?._id === formFieldElement?._id );

            handleSelectorFormFieldAnswers( formFieldElement, e?.target?.value, "", false, formFieldElement['points'] );

        }
    };

return(
    <>
      { ( previewMode ) &&
       <div className={"on-top"}>
        <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement, setMathModalOpen } }>
          <MathScienceLatex 
            previewMode={previewMode} 
            formElement={formFieldElement}
            saveMathScienceFormField={saveFormField}
            loadMathScienceFormField={loadFormFields}
            mathModalOpen={mathModalOpen}
          />
        </FormFieldPanel>
       </div>
      }
      {( previewMode ) && 
        <div>
           <input
            type={"text"}
            value={inputValue}
            onChange={e => handleChangedValue( e.target.value, setInputValue, { ...formFieldElement, inputValue: e.target.value }, saveFormField )}
            placeholder={ formFieldElement?.inputValue } 
          />
        </div>
      }
    <span>
        <span className="radioButton">
        { !previewMode &&
            <input
              type={"checkbox"}
              id={ formFieldElement?._id }
              value={ formFieldElement?.inputValue }
              onChange={e => handleCheckBoxSelection( e )}
              name={ formFieldElement?._id }
              checked={ (  studentsAnswers && ( formBuilderStatus === elementMeta?.state.Taking || formBuilderStatus === elementMeta?.state.Submitted ) ) ? studentsAnswers?.selected  : ( formBuilderStatus === elementMeta?.state.Manage && checkedRadioButton?.id === formFieldElement?._id ) && checkedRadioButton?.isChecked }
            /> 
        }
        </span>
    </span>
    </>
    )
};


 const mapDispatch = {
    saveFormField,
    loadFormFields,
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
      studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps)
    };
  };

export default connect( mapState, mapDispatch )(CheckBox);