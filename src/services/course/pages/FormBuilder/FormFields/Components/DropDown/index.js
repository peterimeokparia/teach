import { 
useState,
useEffect }from 'react';

import { 
connect } from 'react-redux';

import {
loadFormFieldsByFormFieldId,
saveFormFieldNoCallback,
saveFormField } from 'services/course/actions/formfields';

import {
saveOnlineQuestion } from 'services/course/actions/onlinequestions';

import { 
role } from 'services/course/helpers/PageHelpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/Components/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import './style.css';

const DropDown = ( { 
    fieldProps,
    previewMode, 
    handleRadioButtonChangeCallBack,
    formFieldElement,
    saveFormFieldNoCallback,
    saveFormField,
    loadFormFieldsByFormFieldId,
    saveOnlineQuestion,
    formFieldAnswers,
    elememtFormFields,
    studentsAnswer,
    dropDownValues,
    formFieldAnswersError,
    currentUser }) => {

    const [ input, setInput ] = useState("");
    const [ dropDownOptions,  setDropDownOptions ] = useState(['Select']);
    const [ inputValue,  setInputValue ] = useState("");
    const [ answer, setStudentsAnswer ] = useState( null )

    let {
        formBuilderStatus,
        handleFormFieldAnswers,
      } = fieldProps;

      // Disable field if the user viewing the submitted form isn't the one submitting the form.
    useEffect(() => { 
        if ( studentsAnswer?.answer && ( studentsAnswer?.answer !== null || studentsAnswer?.answer !== "" ) ) {
            setStudentsAnswer( studentsAnswer['answer'] );
        }
    }, [ studentsAnswer ]);

    useEffect(() => {
        if ( dropDownOptions?.length === dropDownValues?.length ) {
            return;      
        } else if ( dropDownValues?.length > dropDownOptions?.length ) {
            saveFormField({ ...formFieldElement, dropDownOptions: dropDownValues });
        } else {
            saveFormField({ ...formFieldElement, dropDownOptions });
        }
    }, [ dropDownOptions?.length > dropDownValues?.length ]);

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestion, saveFormField } );
 
    const addOptionValue = () => {
        
        if ( input !== "" ) {
            let dropDownValues = [ ...dropDownOptions, input ];

            setDropDownOptions( dropDownValues );  
            saveFormField({ ...formFieldElement, dropDownOptions: dropDownValues });
        } 
    };

    const handleDropDownSelection = ( value ) => {

       if ( !currentUser?._id ) return;
            setInputValue( value );

        if ( value && currentUser?.role === role?.Tutor && formBuilderStatus === elementMeta.status.Editing  ) {
            saveFormField( { ...formFieldElement, answerKey: value, inputValue: value} );
        }

        if ( value && formBuilderStatus === elementMeta.status.NotEditing ) {
            handleFormFieldAnswers( formFieldElement, value );
        }
    };

return(
    <>
    { ( previewMode ) &&
    <div className={"on-top"}>
        <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
        <input  
            type={'text'}
            value={input}
            onChange={e => setInput( e.target.value )}
        />
        <button onClick={addOptionValue}>
            {"+"}
        </button>
    </div>
    }
    { ( dropDownValues?.length > 0 ) &&  
        <div>
         <span>
            <select 
                name={"select"}
                value={(answer !== "" || answer !== null ) ? answer : inputValue}
                onChange={(e)=> handleDropDownSelection( e.target.value )}
            >
                { dropDownValues?.map( value  => (
                    <option value={value}> { (value) ? value : 'Select'   }</option>
                    ))
                }
            </select> 
        </span>
        </div>
    }
    </>
    );
}

const mapState = ( state, ownProps ) => {
    return {
        currentUser: state.users.user,
        elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
        formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId && field?.formName === ownProps?.formFieldElement?.formName ),
        formFieldAnswersError: state?.formFieldAnswers?.onSaveError,
        studentsAnswer: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ).find( field => field?.fieldId === ownProps?.formFieldElement?._id  && field?.formName === ownProps?.formFieldElement?.formName && field?.formUuId === ownProps?.fieldProps?.formUuId && field?.userId === (ownProps?.fieldProps?.userId ? ownProps?.fieldProps?.userId : ownProps?.currentUser?._id)),
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
        error: state.lessons.onSaveLessonError
    };
};

export default connect( mapState, { saveFormField, saveFormFieldNoCallback, saveOnlineQuestion, loadFormFieldsByFormFieldId } )(DropDown);