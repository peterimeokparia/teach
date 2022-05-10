import { 
useState } from 'react';

import { 
connect } from 'react-redux';
        
import {
saveFormField } from 'services/course/actions/formfields';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import {
getFormFieldAnswersByQuestionId } from 'services/course/selectors';
    
import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const DateTime = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    fieldAnswer,
    formFields,
    elememtFormFields,
    saveOnlineQuestions,
    saveFormField,
    currentUser  } ) => {

    const [ startDate, setStartDate ] = useState('');
    const [ startTime, setStartTime ] = useState('');
    const [ dateTime, setDateTime ] = useState( getDateTime( fieldAnswer?.answer ) );

    let {
        handleFormFieldAnswers,
    } = fieldProps;

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField }  );

    function getDateTime( answer ){
        let dateTime = answer?.split('_');

        if ( !dateTime) return;

        return { date: dateTime[0], time: dateTime[1] } 
    };

return(
    <>  
        { ( previewMode ) &&
          <div className={"on-top"}>
            <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
          </div>
        } 
        {  <>
                <input
                    type="date" 
                    value={ dateTime?.date ? dateTime?.date : startDate} 
                    onChange={ e => setStartDate( e.target.value ) }
                    placeholder="Date"
                />
                <input
                    type="time" 
                    value={ dateTime?.time ? dateTime?.time : startTime} 
                    onChange={ e => setStartTime( e.target.value ) }
                    placeholder="Time"
                />
                <button onClick={ () => handleFormFieldAnswers( formFieldElement, `${startDate}_${startTime}` ) }>{"Submit"}</button>
            </>
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
        formfields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
        elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
        formFieldsLoading: state?.formFields?.formFieldsLoading,
        onFormFieldsLoadingError: state?.formFields?.onFormFieldsLoadingError,
        formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
        formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
        onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
        formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
        fieldAnswer: getFormFieldAnswersByQuestionId( state, ownProps ),
    };
};

export default connect( mapState, mapDispatch )(DateTime);