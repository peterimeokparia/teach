import { 
useEffect, 
useRef, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
saveCourse, 
deleteCourse, 
loadCourses, 
unSubscribeFromCourse } from 'services/course/actions/courses';

import { 
setCurrentLesson } from 'services/course/actions/lessons';

import { 
getUsersByOperatorId,
getCalendarsByOperatorId,
getCalendarByCalendarEventType,
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

import { 
addCalendar } from 'services/course/actions/calendar';

import {
role } from 'services/course/helpers/PageHelpers';

import {
handleAddPushNotificationSubscriptionToEntity,
handleEmailNotificationSubscriptionToEntity,
handleSavingEntityAction } from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu/helper';

import { 
forceReload } from 'services/course/helpers/ServerHelper';

import {
eventEnum,
getCalendarColor } from 'services/course/pages/CalendarPage/helpers';

import {
goToCalendar } from 'services/course/pages/Users/helpers';

import HelpIcon from '@material-ui/icons/Help';
import Roles from 'services/course/pages/components/Roles';
import Loading from 'services/course/pages/components/Loading';
import NavLinks from 'services/course/pages/components/NavLinks';
import Swal from 'sweetalert2';
import MiniSideBarMenu from 'services/course/pages/components/SubscriptionComponent/MiniSideBarMenu';
import UnsubscribeIcon from '@material-ui/icons/Unsubscribe';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NotificationsIcon from '@material-ui/icons/Notifications';
import './style.css';

const CoursesComponent = ({
    operatorBusinessName,
    selectedTutorId,
    user,
    users, 
    operator,
    courses,
    calendars,
    calendar,
    coursesLoading,
    onCoursesError,
    addCalendar,
    lessons,
    saveCourse,
    deleteCourse,
    unSubscribeFromCourse,
    selectedLessonPlanLesson,
    setCurrentLesson,
    sessions }) => {
    const inputRef = useRef();
    const [ editing, setEditing ] = useState(false);
    const [ name, setNewName ] = useState('');
    const [ currentName, setCurrentName ] = useState('');
    const [ description, setNewDescription ] = useState('');
    const [ currentDescription, setCurrentDescription ] = useState('');
    const [ currentCourse, setCurrentCourse ] = useState({});
    const [ deleting, setDelete ] = useState(false);

    useEffect(() => {

        loadCourses();

        if ( editing ) {
            inputRef.current.focus();
        }

        if ( deleting ) {
            setDelete(false);
        }

        if ( selectedLessonPlanLesson?._id ) {
            setCurrentLesson({});
        }
        
    }, [ editing, courses, deleting ]);

    if ( coursesLoading ) {
        return <Loading />;
    }

    if ( onCoursesError ) {
        return <div> { onCoursesError.message } </div>; 
    }

const beginEditing = ( course ) => {
    setCurrentCourse(course);
    setCurrentName(course?.name);
    setCurrentDescription(course?.description);
    setEditing(true);
};

const submitForm = (e) => {
    e.preventDefault();
    saveCourse({
        ...currentCourse, 
        name: (name === "") ? currentName : name, 
        description: (description === "") ? currentDescription : description 
    })
    .then(reset)
    .catch( error => {
        setEditing(false);
        setEditing(true);
    });
};

const reset = () => {
    setEditing(false);
    forceReload();
};

const performDelete = ( course ) => {
    let courseSubscribers = users?.filter(user => user?.courses?.includes(course?._id) && user?.role === "Student");
    let session = sessions.find(session => session?.courseId === course?._id && session?.userId === user?._id);

    if ( courseSubscribers?.length > 0 ) {
        Swal.fire({
            title: "Denied! Subscriptions exist!",
            icon: 'warning',
            html:  `<div> Subscribed Users: </div> <div><ul>${
                courseSubscribers?.map( subsribeduser => (
                    `<li> ${subsribeduser?.firstname}</li>`       
                ))
            }</ul></div>`,
            confirmButtonText: 'Ok',
            confirmButtonColor: '#673ab7',
            })
            .then( response => {
                if ( response?.value ) { 
                    return;
                } 
            });
        return;
    }

    performCourseValidation('Delete ?', 'warning', "You are about to delete:", course)
    .then( (response) => {
        if ( response?.value ) {
            if ( user?.role === "Tutor" ) {
                deleteCourse(course);
                unSubscribeFromCourse( user, course?._id, session?._id );
            }
            setDelete(true);
            return;
        } else {
            return;
        }
    })
    .catch( error => { console.log( error ); });
};

const updateSubscription = ( course ) => {
    let session = sessions.find(session => session?.courseId === course?._id && session?.userId === user?._id);

    performCourseValidation('Unsubscribe ?', 'warning', "You are about to unsubscribe from:", course)
    .then( (response) => {
        if ( response?.value ) {
            unSubscribeFromCourse( user, course?._id, session?._id );
            return;
        } else {
            return;
        }
    })
    .catch( error => { console.log( error ); });
};

function performCourseValidation( title, icon, htmlTitle, course ) {
    return Swal.fire({
        title,
        icon,
        html:   `<div>${htmlTitle} ${course?.name}</div>`,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        confirmButtonColor: '#673ab7',
        cancelButtonText: 'No'
    });
}

const calendarProps = {
    users,
    calendars,
    calendar,
    addCalendar,
    operatorBusinessName,
    operator
};

return  editing 
    ? ( <div>
            <form
                onSubmit={submitForm}
            >
            <input
                name="courseTitle"
                ref={inputRef}
                value={name}
                onChange={e => setNewName(e.target.value)}
                placeholder={currentName}
            >
            </input> 
            </form>
            <form
                onSubmit={submitForm}
            > 
                <input
                    name="courseName"
                    value={description}
                    onChange={e => setNewDescription(e.target.value)}
                    placeholder={currentDescription}
                >
                </input> 
            </form>
        </div>) 
    : ( <div className="ComponentCourseListItem">
            <ul>
            {courses?.map(course => (    
            <NavLinks to={`/${operatorBusinessName}/tutor/${course?.createdBy}/courses/${course?._id}`}>  
                <li 
                    key={course?._id}
                    className={"component-seconday-list-body"}
                >             
                <div className={"user-list-items"}>
                <div className="row">
                    <div className="col-1"> 
                        {/* <img alt='' src={testImage} width="80" height="80"/> */}
                    </div>
                    <div className="col-10">
                       <h3> <span className="multicolortext"> {course?.name}</span></h3>
                    <div className="price"> { course?.description }   </div> 
                    {/* <span className="price"> ${ course?.price.toFixed(2) }   </span>  */}
                        {<span>
                        {user?._id ===  course?.createdBy && (
                        <span>
                        <Roles role={user?.role === role.Tutor && course?.createdBy === user?._id }>
                        <EditIcon 
                            id="EditIcon"
                            data-cy={`${(course?.createdBy)?.toLowerCase()}EditIcon`}
                            className="round-button-1"
                            onClick={() => beginEditing(course)}
                        />
                        </Roles>
                        <Roles role={user?.role === role.Tutor && course?.createdBy === user?._id }>
                        <DeleteIcon 
                            id="DeleteIcon"
                            data-cy={`${(course?.createdBy)?.toLowerCase()}DeleteIcon`}
                            className="round-button-3"
                            onClick={() => performDelete(course)}
                        />
                        </Roles>
                        </span>
                        )}
                        {<span>
                        <MiniSideBarMenu 
                            element={ course }
                            key={ course?._id }
                            currentUser={ user }
                            question={ course }
                            pushNotificationsEnabled={ course?.questionPushNotificationSubscribers?.includes( user?._id ) || course?.userId === user?._id }
                            emailNotificationsEnabled={ course?.questionEmailNotificationSubscribers?.includes( user?._id )  }  
                            entitySavedEnabled={ course?.savedQuestions?.includes( user?._id ) }
                            handleAddPushNotificationSubscription={() => handleAddPushNotificationSubscriptionToEntity( course, course?.questionPushNotificationSubscribers, user,  saveCourse, 'questionPushNotificationSubscribers'  )}
                            handleEmailNotificationSubscription={() => handleEmailNotificationSubscriptionToEntity( course, course?.questionEmailNotificationSubscribers, user,  saveCourse, 'questionEmailNotificationSubscribers' )}
                            handleSaving={() => handleSavingEntityAction( course, course?.savedQuestions, user,  saveCourse, 'savedQuestions' ) }
                        >
                            {( key, handleMouseDown, menuVisible ) => (
                                 <NotificationsIcon 
                                    id="NotificationsIcon"
                                    key={ key }
                                    data-cy={`${(course?.createdBy)?.toLowerCase()}NotificationsIcon`}
                                    className="round-button-2"
                                    mouseDown={ handleMouseDown }
                                    onClick={handleMouseDown }
                                    navMenuVisible={ menuVisible } 
                                />
                            )}
                        </MiniSideBarMenu>    
                        </span>
                        }  
                        {((user?.courses?.find(mycourseId => mycourseId === course?._id)) &&  
                        <span>
                        <UnsubscribeIcon 
                            id="UnsubscribeIcon"
                            data-cy={`${(course?.createdBy)?.toLowerCase()}UnsubscribeIcon`}
                            className="round-button-5"
                            onClick={() => updateSubscription(course)}
                        />
                        </span>     
                        )}       
                        {((user?.courses?.find(mycourseId => mycourseId === course?._id)) &&  
                        <span>
                        <HelpIcon 
                            id="QuizzIcon"
                            data-cy={`${(course?.createdBy)?.toLowerCase()}QuizzIcon`}
                            className="round-button-2"
                            onClick={() => goToCalendar( calendarProps, user, eventEnum?.QuizzForms )}
                        />
                        </span>     
                        )}       
                        </span>     
                        }
                    </div>
                    </div> 
                    </div>
                </li>
                </NavLinks> 
                ))}
            </ul>
    </div>
); };

const mapState = ( state, ownProps) => ({
    user: state?.users?.user,
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    calendar: getCalendarByCalendarEventType(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
    coursesLoading: state.courses.coursesLoading,
    onCoursesError: state.courses.onCoursesError,
    lessons: Object.values(state.lessons.lessons),
    sessions: Object.values(state.sessions.sessions)
});

export default connect(mapState, { addCalendar, saveCourse, deleteCourse, loadCourses, unSubscribeFromCourse, setCurrentLesson })(CoursesComponent);