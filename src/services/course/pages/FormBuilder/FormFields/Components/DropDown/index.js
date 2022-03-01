import { 
useState,
useEffect }from 'react';

import { 
connect } from 'react-redux';

import {
saveFormField } from 'services/course/actions/formfields';

import {
saveOnlineQuestion } from 'services/course/actions/onlinequestions';

import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/components/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import './style.css';

const DropDown = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    saveFormField,
    saveOnlineQuestion,
    elememtFormFields,
    studentsAnswer,
    dropDownValues,
    formFieldAnswersError,
    currentUser }) => {

    const [ input, setInput ] = useState("");
    const [ dropDownOptions,  setDropDownOptions ] = useState(['Select']);
    const [ inputValue,  setInputValue ] = useState( null );
    const [ answer, setStudentsAnswer ] = useState( null );

    let {
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

    const deleteOptionValue = () => {
        
        if ( input !== "" ) {

            let dropDownValues = dropDownOptions?.filter( option => option?.id !== inputValue?.id );

            saveFormField({ ...formFieldElement, dropDownOptions: dropDownValues });
        } 
    };

    const handleDropDownSelection = ( value ) => {

       if ( !currentUser?._id ) return;

       let points = (  studentsAnswer?.answer !== formFieldElement?.answerKey ) ? 0 : formFieldElement['points'];
       
            setInputValue( value );

            handleFormFieldAnswers( formFieldElement, value, points );

        if ( !previewMode ) {
            // handleFormFieldAnswers( formFieldElement, JSON.stringify( value ), formFieldElement?.points );
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
            <button onClick={addOptionValue}>{"+"}</button>
            { inputValue && <button onClick={deleteOptionValue}>{"-"}</button> }
        </div>
    }
    { ( dropDownValues?.length > 0 ) &&  
        <select 
            name={"select"}
            value={ formFieldElement?.inputValue ? formFieldElement?.inputValue : (( answer !== "" || answer !== null ) ? answer : inputValue) }
            onChange={(e)=> handleDropDownSelection( e.target.value  )}
        >
            { dropDownValues?.map( value  => (
                <option value={value}> { (value) ? value : 'Select'   }</option>
                ))
            }
        </select> 
    }
    </>
    );
}

const mapState = ( state, ownProps ) => {
    return {
        currentUser: state.users.user,
        elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
        studentsAnswer: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ).find( field => field?.fieldId === ownProps?.formFieldElement?._id  && field?.formName === ownProps?.formFieldElement?.formName && field?.formUuId === ownProps?.fieldProps?.formUuId && field?.userId === (ownProps?.fieldProps?.userId ? ownProps?.fieldProps?.userId : ownProps?.currentUser?._id)),
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
        error: state.lessons.onSaveLessonError
    };
};

export default connect( mapState, { saveFormField, saveOnlineQuestion } )(DropDown);