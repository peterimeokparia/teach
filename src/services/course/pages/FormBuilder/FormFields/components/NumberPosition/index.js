import { 
useState} from 'react';

import { 
connect } from 'react-redux';
        
import {
saveFormField } from 'services/course/actions/formfields';

import {
getFormFieldAnswersByQuestionId } from 'services/course/selectors';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import { 
handleChangedValue } from 'services/course/pages/FormBuilder/FormFields/helpers';

import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';

const NumberPosition = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    formFields,
    fieldAnswer,
    elememtFormFields,
    saveOnlineQuestions,
    saveFormField,
    currentUser  } ) => {

    const [ selectedNumber, setSelectedNumber ] = useState(fieldAnswer?.answer);
    
    let {
        handleFormFieldAnswers,
    } = fieldProps;

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField }  );

    const getPosition = ( number ) => {
        let numberAsString = number.toString();
        let numberLength = numberAsString?.length;
        let lastValue = number[ numberLength-1 ];

        switch ( parseInt(lastValue) ) {
        
            case 0:
                return 'th';
            case 1:
                return ( parseInt( number[ (( numberLength-1 )-1) ] ) === 1 )  ? 'th' : 'st';
            case 2:
                return ( parseInt( number[ (( numberLength-1 )-1) ] ) === 1 )  ? 'th' : 'nd';
            case 3:
                return ( parseInt( number[ (( numberLength-1 )-1) ] ) === 1 ) ? 'th' : 'rd';
            case 4:
                return 'th';
            case 5:
                return 'th';
            case 6:
                return 'th';
            case 7:
                return 'th';
            case 8:
                return 'th';
            case 9:
                return 'th';
            default:
                break;
        }
    }

return(
    <>  
        { ( previewMode ) &&
          <div className={"on-top"}>
            <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
          </div>
        } 
        {<label>
            {`${selectedNumber}` }
            <div>
                <input
                    type="number" 
                    value={ selectedNumber }
                    onChange={ e => handleChangedValue( e.target.value , setSelectedNumber, formFieldElement, handleFormFieldAnswers( formFieldElement, `${e.target.value }${getPosition( e.target.value )}` ) ) }
                />
            </div>
          </label> 
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
    fieldAnswer: getFormFieldAnswersByQuestionId( state, ownProps ),
    formFieldAnswersLoading: state?.formFieldAnswers?.formFieldAnswersLoading,
    onFormFieldAnswersLoadingError: state?.formFieldAnswers?.onFormFieldAnswersLoadingError,
    formQuestionPoints: Object.values( state?.formFieldPoints?.formFieldPoints )?.filter( field => field?.questionId === ownProps?.fieldProps?.question?._id ),
};
};

export default connect( mapState, mapDispatch )(NumberPosition);