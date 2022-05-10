import { 
useEffect, 
useRef, 
useState } from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/react';

import { 
connect } from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/react-redux';

import { 
navigate } from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/@reach/router';

import { 
loadFormBuilders,
saveFormBuilder,
deleteFormBuilder } from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/services/course/actions/formbuilders';

import { 
getUsersByOperatorId } from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/services/course/selectors';

import { 
forceReload } from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/services/course/helpers/ServerHelper';

import {
elementMeta } from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/services/course/pages/QuestionsPage/helpers';

import { 
role,
roleTypeCollection } from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/services/course/helpers/PageHelpers';

import Roles from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/services/course/pages/components/Roles';
import Loading from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/services/course/pages/components/Loading';
import NavLinks from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/services/course/pages/components/NavLinks';
import Swal from 'sweetalert2';
import MiniSideBarMenu from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import UnsubscribeIcon from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/@material-ui/icons/Unsubscribe';
import DeleteIcon from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/@material-ui/icons/Delete';
import EditIcon from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/@material-ui/icons/Edit';
import NotificationsIcon from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/@material-ui/icons/Notifications';
import Select from 'services/course/pages/CalendarPage/components/Courses/components/TutorCourseLessonListComponent/node_modules/react-select';
import './style.css';

const TutorCourseLessonListComponent = ({
    operatorBusinessName,
    selectedTutorId,
    user,
    users, 
    forms,
    formBuildersLoading,
    onFormBuildersLoadingError,
    loadFormBuilders,
    saveFormBuilder, 
    deleteFormBuilder,
    unSubscribeFromCourse,
    lessons,
    courses,
    tutors,
    setSelectedForm }) => {
    const inputRef = useRef();
    const FormType = { Tutor: 'Tutor', Course: 'Course', Lesson: 'Lesson'}
    const [ selectedTutor, setSelectedTutor ] = useState(undefined);
    const [ selectedCourse, setSelectedCourse ] = useState(undefined);
    const [ selectedLesson, setSelectedLesson ] = useState(undefined);
    const [ selectedForm, setSelectedForm ] = useState({ type: FormType.Tutor, payload: tutors });
    const [ reloadItems, setReloadItems ] = useState(false);

    useEffect(() => {

    }, [ selectedForm  ]);

 
function performValidation( title, icon, htmlTitle, itemName ) {
    return Swal.fire({
        title,
        icon,
        html: `<div>${htmlTitle} ${itemName}</div>`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#673ab7',
        cancelButtonText: 'No'
    });
}

function handleFormSelection( form, type ){
    switch (type) {
        case FormType.Tutor:  
            if ( form ){
                alert('in tutor')
                alert(JSON.stringify(form))
                setSelectedTutor( form );
                setSelectedForm({ type: FormType.Course, payload: courses })
            }
            break;
        case FormType.Course:
            if ( form ){
                alert('in Course')
                alert(JSON.stringify(form))
                setSelectedTutor( form );

                let selectedCourseLessons = lessons?.filter( item => item?.courseId === form?._id );
                alert('lessons')
                alert(JSON.stringify(selectedCourseLessons))
                setSelectedForm({ type: FormType.Lesson, payload: selectedCourseLessons })
            }  
            break;
        case FormType.Lesson:  
        if ( form ){
            alert('in Lesson')
            alert(JSON.stringify(form))
            setSelectedTutor( form );
            setSelectedForm({ type: FormType.Tutor, payload: tutors })
        }  
            break;
        default:
            break;
    }
}

function getDescription( form, formType ){
    switch (formType) {
        case FormType.Tutor:
            return `${form?.firstname}`;
        case FormType.Course:
            return `${form?.name}\\n ${form?.createdBy}`;
        case FormType.Lesson:
            return `${form?.title}\\n ${form?.userId}`;;
        default:
            break;
    }
}

function navigateToSelectedForm(selectValue){
    setSelectedForm( selectValue );
}

return <div className='MyCourses'> 
        <div className="ComponentCourseListItem">
            <ul>
            {selectedForm?.payload?.map(form => (     
                <li 
                    key={form?._id}
                    className={"component-seconday-list-body"}
                    onClick={()=> handleFormSelection( form, selectedForm?.type )}
                >             
                <div className={"user-list-items"}>
                <div className="row">
                    <div className="col-1"> 
                    </div>
                    <div className="col-10">
                       <h3> <span className="multicolortext"> { getDescription( form, selectedForm?.type ) }</span></h3>
                    </div>
                    </div> 
                    </div>
                </li>
                ))}
            </ul>
    </div>
    </div>
 };

const mapState = ( state, ownProps) => ({
    user: state?.users?.user,
    users: getUsersByOperatorId(state, ownProps),
    onSaveError: null,
    formBuildersLoading: state?.formBuilders?.formBuilders,
    onFormBuildersLoadingError: state?.formBuilders?.onFormBuildersLoadingError
});

export default connect(mapState, { loadFormBuilders, saveFormBuilder, deleteFormBuilder } )(TutorCourseLessonListComponent);