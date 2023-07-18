import { connect } from 'react-redux';
import { loadFormFields, saveFormField } from './node_modules/services/course/actions/formfields';
import { loadFormFieldAnswers, saveFormFieldAnswer } from './node_modules/services/course/actions/formfieldanswers';
import { saveOnlineQuestions } from './node_modules/services/course/actions/onlinequestions';
import { getFormFieldAnswersByQuestionId } from './node_modules/services/course/selectors';
import Select from 'react-select';
import MathScienceLatex from './node_modules/services/course/pages/OnlineQuestionsPage/components/MathScienceLatex';
import FormFieldPanel from './node_modules/services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/FormFieldPanel';
import useAssignPointsHook from './node_modules/services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import useDropDownSelectorHook from 'services/course/pages/FormBuilder/hooks/useDropDownSelectorHook';
import './style.css';

const DropDown = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    loadFormFields,
    saveFormField,
    loadFormFieldAnswers,
    saveFormFieldAnswer,
    saveOnlineQuestions,
    elememtFormFields,
    formFieldAnswers,
    studentAnswerByQuestionId,
    dropDownValues,
    currentUser 
}) => {
    let { userId, formUuId, handleFormFieldAnswers } = fieldProps;

    let selectorProps = { userId, formUuId, dropDownValues, handleFormFieldAnswers, formFieldAnswers, studentAnswerByQuestionId,
        saveFormField, loadFormFieldAnswers, saveFormFieldAnswer, formFieldElement, currentUser, previewMode
    };

    let {
        input, inputValue, mathModalOpen, setMathModalOpen, setInput,
        handleDropDownSelection, addOptionValue, deleteOptionValue, roleTypeCollection
    } = useDropDownSelectorHook( selectorProps );

    let {
        addFieldPoints, handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField } );
 
return(
    <>
    { ( previewMode ) &&
        <div className={"on-top"}>
            <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement, setMathModalOpen } } >
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
    { ( previewMode ) && 
        <div>
            <input  
                type={'text'}
                value={input}
                onChange={e => setInput( e.target.value )}
            />
            <button onClick={addOptionValue}>{"+"}</button>
            { inputValue && <button onClick={deleteOptionValue}>{"-"}</button> }
        </div>
    }
    { ( dropDownValues?.length > 0 ) &&  
        <Select
            placeholder={`Select`}
            value={inputValue}
            onChange={handleDropDownSelection}
            options={ roleTypeCollection }  
        />    
    }
    </>
    );
};

const mapState = ( state, ownProps ) => {
    return {
        currentUser: state.users.user,
        elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
        error: state.lessons.onSaveLessonError,
        formFieldAnswers: state?.formFieldAnswers?.formFieldAnswers,
        studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps)
    };
};

export default connect( mapState, { loadFormFields, saveFormField, saveFormFieldAnswer, saveOnlineQuestions, loadFormFieldAnswers } )(DropDown);