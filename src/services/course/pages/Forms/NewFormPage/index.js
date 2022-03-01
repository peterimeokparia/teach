import { 
useState, 
useEffect, 
useRef } from 'react';

import { 
connect } from 'react-redux';

import { 
loadFormBuilders,
addNewFormBuilder } from 'services/course/actions/formbuilders';

import { 
loadLessons } from 'services/course/actions/lessons';

import { 
Validations } from  'services/course/helpers/Validations';

import { 
toast } from 'react-toastify';

import {
v4 as uuidv4 } from 'uuid';

import { 
formTypeCollection } from 'services/course/pages/FormBuilder/helpers';

import { 
role,
roleTypeCollection } from 'services/course/helpers/PageHelpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
getOperatorFromOperatorBusinessName,    
getCoursesByOperatorId } from 'services/course/selectors';

import Select from 'react-select'; 
import './style.css';

const NewFormPage = ({
    saveInProgress,
    onSaveError,
    onCoursesError,
    user,
    users,
    courses,
    lessons,
    operatorBusinessName,
    operator,
    typeOfForm,
    dispatch }) => {
    const [ formDisplayName, setFormDisplayName ] = useState('');
    const [ formType, setFormType ] = useState( ( !typeOfForm ) ? '' : typeOfForm);
    const [ course, setCourse ] = useState( undefined );
    const [ lesson, setLesson ] = useState( undefined );
    const [ userRole, setUserRole ] = useState('');
    const inputRef = useRef();
    let currentUser = user;

    useEffect (() => {
        inputRef.current.focus();
    }, []); 

    // change to hook
    useEffect(() => {

        if ( course ){

            dispatch( loadLessons( course?.value?._id ) );

        }

    }, [ course ])

    if ( onSaveError ) {
        toast.error(`There was a problem while adding the new form: ${ formDisplayName }: ${ onSaveError?.message }`);
    }

    const generateUuid = () => {
        const uuid = uuidv4();
        return uuid;
    };

    const handleSubmit = e => { 
        e.preventDefault(); 
        
        if ( (Validations.checkFormInputString("Form Name", formDisplayName))) {        
        
            let dateTime = Date.now();
            let uuid = generateUuid();
            let formUuId = uuid;    
            let formName = `${formDisplayName.split(" ").join("")}_${formUuId}`;
            let userId = currentUser?._id;
            let formId = '000';
            let eventId = '000';

            let newBuilder = {
                operatorBusinessName,
                formType: formType?.value,
                formDisplayName,
                formName,
                courseId: ( course?.value?._id ? course?.value?._id : '' ),
                lessonId: ( lesson?.value?._id ? lesson?.value?._id : '' ),
                formId,
                formUuId,
                createDateTime: dateTime,
                takingDateTime: dateTime,
                createdBy: currentUser?._id,
                userId,
                status: elementMeta.status.Pending,
                state: elementMeta.state.Manage,
                orderedFormQuestions: [],
                role: userRole?.value,
                eventId
            };

            dispatch( addNewFormBuilder( newBuilder ) );

            dispatch( loadFormBuilders() );
            
        }
    };

    if ( saveInProgress ) {
        return <div>...loading</div>;
    } 

    const formTypeOption = ( formTypes ) => formTypes?.map( item => ( { value: item,  label: item } ));
    const roleTypeOption = ( roleTypes ) => roleTypes?.map( item => ( { value: item,  label: item } ) );
    const courseTypeOption = ( courseList ) => courseList?.map( item => ( { value: item,  label: `${item?.name} - ${users?.find(usr => usr?._id === item?.createdBy)?.firstname}.`}));
    const lessonTypeOption = ( lessonList ) => lessonList?.filter?.(lesson => lesson?.courseId === course?.value?._id )?.map( item => ( { value: item,  label: item?.title } ));

return (
    <div className="NewForm">
        <h1>{`Create new form.`}</h1> 
        <br></br>
        <form onSubmit={handleSubmit}> 
            <label>
             Enter form name:
            <input
                ref={inputRef} 
                disabled={saveInProgress} 
                value={formDisplayName} 
                onChange={(e) => setFormDisplayName(e.target.value)}
            />
            </label>
            <label>
             Select form type:  
            <Select
                placeholder={`Select form type`}
                value={formType}
                onChange={setFormType}
                options={formTypeOption( Object.values( formTypeCollection ) )} 
            />    
            </label>
            { (formType && [ "quizzwithpoints", "homework", "examwithpoints" ].includes(formType?.value)  ) && <label>
                Select course:  
                <Select
                    placeholder={`Select form type`}
                    value={course}
                    onChange={setCourse}
                    options={courseTypeOption( Object.values( courses ) )} 
                />    
              </label>
            }
            {(formType && [ "quizzwithpoints", "homework" ].includes(formType?.value)  ) && ( course !== undefined ) &&  <label>
                Select lesson:  
                <Select
                    placeholder={`Select form type`}
                    value={lesson}
                    onChange={setLesson}
                    options={lessonTypeOption( Object.values( lessons ) )} 
                />    
              </label>
            }
            <label>
             Select who can view forms:  
            <Select
                placeholder={`Select role type`}
                value={userRole}
                onChange={setUserRole}
                options={roleTypeOption( Object.values( roleTypeCollection ) )} 
            />    
            </label>
            {
                <div>
                {
                    Validations?.setErrorMessageContainer()
                }
                </div>  
            }
            { onSaveError && (
                <div className="saveError-message">
                    Error: { onSaveError.message }
                </div>
            )}
            <button type="submit" disabled={saveInProgress}> Create Form </button>
        </form>
    </div>
); };

const mapState = (state, ownProps ) => ({
    user: state.users.user,
    users: Object.values(state?.users?.users),
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    courses: Object.values(state?.courses?.courses),
    lessons : Object.values(state?.lessons?.lessons), // filter on back end to reduce load on server
    // courses: Object.values(state?.courses?.courses)?.filter(crs => crs?.operatorId === ownProps.operator?._id ),
    // lessons : Object.values(state?.lessons?.lessons)?.filter(crs => crs?.operatorId === ownProps.operator?._id),
    // courses: Object.values(state?.courses?.courses)?.filter(crs => crs?.operatorId === ownProps.operator?._id && crs?.createdBy === ownProps?.user?._id),
    // lessons : Object.values(state?.lessons?.lessons)?.filter(crs => crs?.operatorId === ownProps.operator?._id && crs?.userId === ownProps?.user?._id),
    saveInProgress: state.courses.saveInProgress,
    onSaveError: state.courses.onSaveError,
    onCoursesError: state.courses.onCoursesError,
});

export default connect(mapState)(NewFormPage);