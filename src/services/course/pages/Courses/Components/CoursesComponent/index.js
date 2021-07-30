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
unSubscribeFromCourse } from 'Services/course/Actions/Courses';

import { 
getUsersByOperatorId } from 'Services/course/Selectors';

import {
handleAddPushNotificationSubscriptionToEntity,
handleEmailNotificationSubscriptionToEntity,
handleSavingEntityAction } from 'Services/course/Pages/Components/SubscriptionComponent/MiniSideBarMenu/helper';

import { 
forceReload } from 'Services/course/helpers/ServerHelper';

import Loading from 'Services/course/Pages/Components/Loading';
import NavLinks from 'Services/course/Pages/Components/NavLinks';
import Swal from 'sweetalert2';
import testImage from './images/courses_books.jpeg';
import MiniSideBarMenu from 'Services/course/Pages/Components/SubscriptionComponent/MiniSideBarMenu';
import './style.css';

const CoursesComponent = ({
    operatorBusinessName,
    selectedTutorId,
    user,
    users, 
    courses,
    coursesLoading,
    onCoursesError,
    lessons,
    saveCourse,
    deleteCourse,
    unSubscribeFromCourse,
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
        //[ loadCourses, editing, courses, deleting ]);
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
                <li 
                key={course?._id}
                className={"component-seconday-list-body"}
                >             
                <div className={"user-list-items"}>
                <div className="row">
                    <div className="col-1"> 
                        <img alt='' src={testImage} width="80" height="80"/>
                    </div>
                    <div className="col-10">
                    <NavLinks to={`/${operatorBusinessName}/tutor/${ course?.createdBy }/courses/${ course?._id }`}>
                        <span className="multicolortext"> {course?.name}</span>
                    </NavLinks>
                    <div className="price"> { course?.description }   </div> 
                    {/* <span className="price"> ${ course?.price.toFixed(2) }   </span>  */}
                        {<span>
                        {user?._id ===  course?.createdBy && (
                        <span>
                        <button
                            className="edit-course-btn"  // rename
                            onClick={() => beginEditing(course)}> 
                            Edit   
                        </button>
                        <button
                            className="delete-course-btn"
                            onClick={() => performDelete(course)}> 
                            Delete 
                        </button>
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
                                <button
                                    className="delete-course-btn"
                                    onClick={handleMouseDown }
                                    key={ key }
                                    mouseDown={ handleMouseDown }
                                    navMenuVisible={ menuVisible } 
                                > 
                                    Notifications 
                                </button>
                            )}
                        </MiniSideBarMenu>    
                        </span>
                        }  
                        {((user?.courses?.find(mycourseId => mycourseId === course?._id)) &&  
                        <span>
                        <button
                            className="delete-course-btn"
                            onClick={() => updateSubscription(course)}> 
                            Unsubscribe 
                        </button> 
                        </span>     
                        )}       
                        </span>     
                        }
                    </div>
                    </div> 
                    </div>
                </li>
                
                ))}
            </ul>
    </div>
); };

const mapState = ( state, ownProps) => ({
    user: state?.users?.user,
    users: getUsersByOperatorId(state, ownProps),
    coursesLoading: state.courses.coursesLoading,
    onCoursesError: state.courses.onCoursesError,
    lessons: Object.values(state.lessons.lessons),
    sessions: Object.values(state.sessions.sessions)
});

export default connect(mapState, { saveCourse, deleteCourse, loadCourses, unSubscribeFromCourse })(CoursesComponent);