import 
react, { 
useState } from 'react';

import { 
connect } from 'react-redux';
        
import {
saveFormField } from 'services/course/actions/formfields';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
getFormFieldAnswersByQuestionId } from 'services/course/selectors';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';
    
import ToggleButton from 'services/course/pages/components/ToggleButton';
import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const Toggle = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    fieldAnswer,
    formFields,
    elememtFormFields,
    saveOnlineQuestions,
    saveFormField,
    studentsAnswer,
    currentUser  } ) => {

    let {
        formBuilderStatus,
        handleSelectorFormFieldAnswers,
      } = fieldProps;

    const [toggleCheckBox, setCheckedRadioButton ] = useState( ( formBuilderStatus === elementMeta?.state.Manage ) ? { id: formFieldElement?._id, isChecked: formFieldElement['selected'] } : {});

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( { ...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField }  );

    const handleToggleChange = (e) => {  

        setCheckedRadioButton( { id: formFieldElement?._id, isChecked: e?.target.checked } );
        
        if (  e?.target?.checked && e?.target?.value ) {

            handleSelectorFormFieldAnswers( formFieldElement, `${ e?.target?.checked }`, `${ e?.target?.checked }`,  e?.target?.checked,  formFieldElement['points'] );

        } else {

            const currentField = formFields?.find( field => field?._id === formFieldElement?._id );

            handleSelectorFormFieldAnswers( formFieldElement, `${ e?.target?.checked }`, "", false, formFieldElement['points'] );
        }
 
     };
  
return(
    <>  
        { ( previewMode ) &&
          <div className={"on-top"}>
              <label>
              <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
              </label>
            
          </div>
        } 
        {
         <div> <label> { `${ toggleCheckBox?.isChecked?.toString() }` }  </label></div>           
        }
        { 
         <div className=""> 
            <ToggleButton
                isDisabled={false} 
                onChange={ handleToggleChange }
                isChecked={ (  studentsAnswer && formBuilderStatus === elementMeta?.state.Taking  ) ? studentsAnswer['selected']  : ( formBuilderStatus === elementMeta?.state.Manage && toggleCheckBox?.id === formFieldElement?._id ) && toggleCheckBox?.isChecked }
                value={ `${ toggleCheckBox?.isChecked?.toString() }` }
            />
          </div>
        }  
    </>
    )
};


const mapDispatch = {
    saveFormField,
    saveOnlineQuestions
};
  
const mapState = ( state, ownProps ) => { 
    return {
        currentUser: state.users.user,
        currentUsers: Object.values( state.users.users ),
        formFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
        elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
        formFieldsLoading: state?.formFields?.formFieldsLoading,
        onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
        formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
        formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
        onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
        formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
        fieldAnswer: getFormFieldAnswersByQuestionId( state, ownProps ),
        studentsAnswer: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ).
            find( field => field?.fieldId === ownProps?.formFieldElement?._id  && field?.formName === ownProps?.formFieldElement?.formName 
                && field?.formUuId === ownProps?.fieldProps?.formUuId && field?.userId === (ownProps?.fieldProps?.userId ? ownProps?.fieldProps?.userId : ownProps?.currentUser?._id)),
    };
};

export default connect( mapState, mapDispatch )(Toggle);