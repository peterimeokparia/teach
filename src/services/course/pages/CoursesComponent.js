import React, { 
useEffect, 
useRef, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
saveCourse, 
deleteCourse, 
loadCourses, 
unSubscribeFromCourse } from '../actions';

import { 
getUsersByOperatorId } from '../Selectors';

import { 
forceReload } from '../../../helpers/serverHelper';

import Loading from './Loading';
import NavLinks from './NavLinks';
import Swal from 'sweetalert2';

import './CoursesComponent.css';




const CoursesComponent = ({
operatorBusinessName,
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
const [ currentName, setCurrentName ] = useState('')
const [ description, setNewDescription ] = useState('');
const [ currentDescription, setCurrentDescription ] = useState('')
const [ currentCourse, setCurrentCourse ] = useState({});
const [ deleting, setDelete ] = useState(false);


    useEffect(() => {

         loadCourses();

        if ( editing ) {
            inputRef.current.focus();
        }

        setDelete(false);

    }, [ loadCourses, editing, courses ]);




    if ( coursesLoading ) {

        return <Loading />
    }         


    if ( onCoursesError ) {

      return <div> { onCoursesError.message } </div> 

    }  

    
    const beginEditing = ( course ) => {
        setCurrentCourse(course);
        setCurrentName(course?.name);
        setCurrentDescription(course?.description);
        setEditing(true);
    }



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
    } 


    const reset = () => {
        setEditing(false);
        forceReload();
        // resetError();
    }


    
    const performDelete = ( course ) => {

        let courseSubscribers = users?.filter(user => user?.courses?.includes(course?._id) && user?.role === "Student");

        let session = sessions.find(session => session?.courseId === course?._id && session?.userId === user?._id);

        if ( courseSubscribers?.length > 0 ) {

            Swal.fire({
                title: "Denied! Subscriptions exist!",
                icon: 'warning',
                html:  '<div>' + "Subscribed Users:" + '</div>' + '<div><ul>'+`${
                    
                    courseSubscribers?.map( subsribeduser => (
                   
                       '<li>' + `${subsribeduser?.firstname}` + '</li>'
                         
                    ))
                
                }` +'</ul></div>',
                // showCancelButton: true,
                confirmButtonText: 'Ok',
                confirmButtonColor: '#673ab7',
                // cancelButtonText: 'No'
              })
               .then( response => {

                    if ( response?.value ) { 

                     return;
                    } 
                })

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
            });
    }




    const updateSubscription = ( course ) => {

        let session = sessions.find(session => session?.courseId === course?._id && session?.userId === user?._id);

        performCourseValidation('Unsubscribe ?', 'warning', "You are about to unsubscribe from:", course)
            .then( (response) => {

                if ( response?.value ) {

                  unSubscribeFromCourse( user, course?._id, session?._id )
                    
                  return;

                } else {
        
                  return;

                }
            });
    }



    function performCourseValidation( title, icon, htmlTitle, course ) {

        return Swal.fire({
            title,
            icon,
            html:   '<div>'+ htmlTitle + `${course?.name}` +'</div>',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#673ab7',
            cancelButtonText: 'No'
          });
    }

    
    return  editing ? (<div>
           
                     <form
                        onSubmit={submitForm}
                     >
                         <input
                           name="courseTitle"
                           ref={inputRef}
                           value={name}
                           onChange={e => setNewName(e.target.value)}
                           //onBlur={reset}
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
                           //onBlur={reset}
                           placeholder={currentDescription}
                         >
                         </input> 

                     </form>


                    </div>) : (
                <div className="ComponentCourseList">
                   <ul>
                    { courses?.map( course => ( 
                       <li 
                          key={course?._id}
                            className={"component-seconday-list-body"}
                       >

                           <div className={"user-list-items"}>

                            <NavLinks to={`/${operatorBusinessName}/courses/${course?._id}`}>
                                <span> {course?.name}</span>
                            </NavLinks>
                             <div className="price"> { course?.description }   </div> 
                                {/* <span className="price"> ${ course?.price.toFixed(2) }   </span>  */}

                                 {  
                                       <div>
                                          {user?._id ===  course?.createdBy && (
                                                <span>
                                                    <button
                                                        className="edit-lesson-btn"  // rename
                                                        onClick={() => beginEditing(course)}> 
                                                        
                                                        Edit 
                                                        
                                                    </button>

                                                    <button
                                                        className="delete-lesson-btn"
                                                        onClick={() => performDelete(course)}> 
                                                        
                                                        Delete 
                                                        
                                                    </button>
                                                </span>
                                          )
                                          }  
                                          {( ( user?.courses?.find(mycourseId => mycourseId === course?._id) && user?.role === "Student") &&  <span>
                                                    <button
                                                        className="delete-lesson-btn"
                                                        onClick={() => updateSubscription(course)}> 

                                                        Unsubscribe 

                                                    </button> 
                                                </span>
                                                 
                                          )}
                                        
                                     </div>
                              
                                 }
                                
                           </div>
                           
                       </li>
                     ))}
                 </ul>
            </div>
          
    )
       
}



const mapState = ( state, ownProps) => ({
    user: state?.users?.user,
    users: getUsersByOperatorId(state, ownProps),
    coursesLoading: state.courses.coursesLoading,
    onCoursesError: state.courses.onCoursesError,
    lessons: Object.values(state.lessons.lessons),
    sessions: Object.values(state.sessions.sessions)
})

export default connect(mapState, { saveCourse, deleteCourse, loadCourses, unSubscribeFromCourse })(CoursesComponent);