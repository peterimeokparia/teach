import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveCourse, deleteCourse, loadCourses, unSubscribeFromCourse } from 'services/course/actions/courses';
import { setCurrentLesson } from 'services/course/actions/lessons';
import { forceReload } from 'services/course/helpers/ServerHelper';
import Loading from 'services/course/pages/components/Loading';
import Swal from 'sweetalert2';

function useCourseComponentHook( props ) {
  let { selectedLessonPlanLesson, courses, coursesLoading, onCoursesError, users, user, sessions } = props;

  const dispatch = useDispatch();
  const [ editing, setEditing ] = useState(false);
  const [ name, setNewName ] = useState('');
  const [ currentName, setCurrentName ] = useState('');
  const [ description, setNewDescription ] = useState('');
  const [ currentDescription, setCurrentDescription ] = useState('');
  const [ currentCourse, setCurrentCourse ] = useState({});
  const [ deleting, setDelete ] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if ( editing ) {
        inputRef.current.focus();
    }

    if ( deleting ) {
        setDelete(false);
    }

    if ( selectedLessonPlanLesson?._id ) {
      dispatch( setCurrentLesson({}) );
    }
  }, [ dispatch, editing, courses, deleting, selectedLessonPlanLesson?._id ]);

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
    dispatch( saveCourse({
        ...currentCourse, 
        name: (name === "") ? currentName : name, 
        description: (description === "") ? currentDescription : description 
    }) )
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
              dispatch( deleteCourse(course) );
              dispatch( unSubscribeFromCourse( user, course?._id, session?._id ) );
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
          dispatch( unSubscribeFromCourse( user, course?._id, session?._id ) );
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

return {
  editing, submitForm, inputRef, name, setNewName, currentName, description,
  setNewDescription, currentDescription, beginEditing, performDelete, updateSubscription
}; }

export default useCourseComponentHook;