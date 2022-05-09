import { 
useState,
useEffect }from 'react';

import { 
connect } from 'react-redux';

import {
saveFormField } from 'services/course/actions/formfields';

import {
saveOnlineQuestions } from 'services/course/actions/onlinequestions';

import { 
role } from 'services/course/helpers/PageHelpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
getFormFieldAnswersByQuestionId } from 'services/course/selectors';

import FormFieldPanel from 'services/course/pages/FormBuilder/FormFields/component/FormFieldPanel';
import useAssignPointsHook from 'services/course/pages/FormBuilder/hooks/useAssignPointsHook';
import useFormFieldAnswersHook from 'services/course/pages/FormBuilder/hooks/useFormFieldAnswersHook';
import './style.css';

const DataObjectSelector = ( { 
    fieldProps,
    previewMode, 
    formFieldElement,
    saveFormField,
    saveOnlineQuestions,
    elememtFormFields,
    studentAnswerByQuestionId,
    dropDownValues,
    formFieldAnswersError,
    tutors,
    students,
    courses,
    lessons,
    currentUser }) => {

    const [ input, setInput ] = useState( undefined );
    // const [ dropDownOptions,  setDropDownOptions ] = useState(['Select']);
    const [ dropDownOptions,  setDropDownOptions ] = useState([]);
    const [ inputValue,  setInputValue ] = useState("");
    const [ answer, setStudentsAnswer ] = useState( null )
    const [ content, setContentChanged ] = useState(false)

    let {
        formBuilderStatus,
        handleFormFieldAnswers,
        moveInputField, 
        setMoveInputField,
    } = fieldProps;

    let {
        studentsAnswers
    } = useFormFieldAnswersHook( studentAnswerByQuestionId );

    useEffect(() => {

        if ( dropDownOptions?.length === dropDownValues?.length ) {
            return;      
        } else if ( dropDownValues?.length > dropDownOptions?.length ) {
            saveFormField({ ...formFieldElement, dropDownOptions: dropDownValues });
        } else {
            saveFormField({ ...formFieldElement, dropDownOptions });
        }

    }, [ dropDownOptions?.length > dropDownValues?.length  ]);

    useEffect(() => {

        let studentCollection = Object.values( students?.map(student => student?.firstname ));
        let tutorsCollection = Object.values( tutors?.map(tutor => tutor?.firstname) );
        let coursesCollection = Object.values( courses?.map(course => course?.name) );
        let lessonsCollection = Object.values( lessons?.map(lesson => lesson?.title) );

        switch ( input?.target?.value ) {
            case role.Student:
                setDropDownOptions( studentCollection );  
                saveFormField({ ...formFieldElement, dropDownOptions: studentCollection  });
                break;
            case role.Tutor:
                setDropDownOptions( tutorsCollection );  
                saveFormField({ ...formFieldElement, dropDownOptions: tutorsCollection  });
                break;
            case 'COURSES':
                setDropDownOptions( coursesCollection );  
                saveFormField({ ...formFieldElement, dropDownOptions: coursesCollection  });
                break;
            case 'LESSONS':
                setDropDownOptions( lessonsCollection );  
                saveFormField({ ...formFieldElement, dropDownOptions: lessonsCollection });
                break;
            case 'SELECT':
                setDropDownOptions( Object.values( ['Select'] ) );  
                saveFormField({ ...formFieldElement, dropDownOptions: Object.values( ['Select'] )  });
                break;
            default:
                break;
        }

    }, [ input?.target?.value ]);

    let {
        addFieldPoints,
        handleTogglingModal,
    } = useAssignPointsHook( {...fieldProps, formFieldElement, elememtFormFields, saveOnlineQuestions, saveFormField } );
 
    // need operator business name and Id
    const addOptionValue = ( event ) => {
        event.preventDefault();
    };

    const handleDropDownSelection = ( value ) => {

       if ( !currentUser?._id ) return;
       
            setInputValue( value );

        if ( value && formBuilderStatus === elementMeta.state.Manage  ) {
            saveFormField( { ...formFieldElement, answerKey: value, inputValue: value} );
        }

        if ( value && formBuilderStatus === elementMeta.state.Taking ) {
            handleFormFieldAnswers( formFieldElement, value );
        }
    };

return(
    <>
    { ( previewMode ) &&
        <div className={"on-top"}>
            <FormFieldPanel props={ { ...fieldProps, handleTogglingModal, addFieldPoints, formFieldElement } } />
            <select value={ input?.target?.value } onChange={setInput}>  
                <option value={'SELECT'}>{'Select'}</option>          
                <option value={role.Student}>{'Students'}</option>
                <option value={role?.Tutor}>{'Tutors'}</option>
                <option value="COURSES">{'Courses'}</option>
                <option value="LESSONS">{'Lessons'}</option>
            </select>    
            {/* <button onClick={addOptionValue}>{"+"}</button> */}
        </div>
    }
    { ( dropDownValues?.length > 0 ) &&  

        <div>
         <span>
            <select 
                name={"select"}
                value={ formFieldElement?.inputValue ? formFieldElement?.inputValue : (( answer !== "" || answer !== null ) ? answer : inputValue) }
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
        tutors: Object.values( state.users.users )?.filter( user => user?.role === role.Tutor),
        students: Object.values( state.users.users )?.filter( user => user?.role === role.Student),
        courses: Object.values( state.courses.courses ),
        lessons: Object.values( state.lessons.lessons ),
        elememtFormFields: Object.values( state?.formFields?.formFields ).filter( field => field?.questionId === ownProps?.formFieldElement?.questionId ),
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
        error: state.lessons.onSaveLessonError,
        studentAnswerByQuestionId: getFormFieldAnswersByQuestionId(state, ownProps)
    };
};
export default connect( mapState, { saveFormField, saveOnlineQuestions } )(DataObjectSelector);