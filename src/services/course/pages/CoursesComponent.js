import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { saveCourse, deleteCourse, loadCourses, unSubscribeFromCourse } from '../actions';
import Loading from './Loading';
import NavLinks from './NavLinks';
import Swal from 'sweetalert2';
import './CoursesComponent.css';



//https://stackoverflow.com/questions/53215285/how-can-i-force-component-to-re-render-with-hooks-in-react
//https://www.npmjs.com/package/mongoose-reload
//https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react#:~:text=If%20set%20to%20true%2C%20the,cached%20version%20of%20the%20page.&text=import%20React%20from%20'react'%3B,refreshPage%7D%3EClick%20to%20reload!

const CoursesComponent = ({
    //    loadCourses,
       user,
       users, 
       courses,
       coursesLoading,
       onCoursesError,
       lessons,
       saveCourse,
       deleteCourse,
       unSubscribeFromCourse
    //    resetError 
    }) => {

    const inputRef = useRef();
    const [ editing, setEditing ] = useState(false);
    const [ name, setNewName ] = useState('');
    const [ currentName, setCurrentName ] = useState('')
    const [ currentCourse, setCurrentCourse ] = useState({});
    const [ deleting, setDelete ] = useState(false);


    useEffect(() => {

         loadCourses();

        if ( editing ) {
            inputRef.current.focus();
        }

        setDelete(false);

    }, [ loadCourses, editing, courses ]);




    if ( coursesLoading) {

        return <Loading />
    }         


    if ( onCoursesError ) {

      return <div> { onCoursesError.message } </div> 

    }  

    
    const beginEditing = ( course ) => {
        setCurrentCourse(course);
        setCurrentName(course?.name)
        setEditing(true);
    }



    const submitForm = (e) => {
        e.preventDefault();
        saveCourse({...currentCourse, name})
        .then(reset)
        .catch( error => {
          setEditing(false);
          setEditing(true);
        });
    } 


    const reset = () => {
        setEditing(false);
        // resetError();
    }

    
    const performDelete = ( course ) => {

        let courseSubscribers = users?.filter(user => user?.courses?.includes(course?._id) && user?.role === "Student")

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

                        unSubscribeFromCourse( user, course?._id );
                    } 

                    setDelete(true);
                
                    return;

                } else {
        
                    return;

                }
            });
    }


    const updateSubscription = ( course ) => {

        performCourseValidation('Unsubscribe ?', 'warning', "You are about to unsubscribe from:", course)
            .then( (response) => {

                if ( response?.value ) {

                  unSubscribeFromCourse( user, course?._id )
                    
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
                        className=""
                        onSubmit={submitForm}
                     >
                         <input
                           ref={inputRef}
                           value={name}
                           onChange={e => setNewName(e.target.value)}
                           onBlur={reset}
                           placeholder={currentName}
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

                           <div className={ "user-list-items"}>

                            <NavLinks to={`/courses/${course?._id}`}>
                                <span> {course?.name}</span>
                                <span> {course?.createdByName}</span>
                            </NavLinks>

                                {/* <span className="price"> ${ course?.price.toFixed(2) }   </span>  */}

                                 {  
                                       <div>
                                          {user._id ===  course?.createdBy && (
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
                                          )}  
                                          {( ( user?.courses?.includes(course?._id) && user?.role === "Student") &&  <span>
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



const mapState = state => ({
    user: state?.users?.user,
    users: Object.values(state?.users?.users),
    coursesLoading: state.courses.coursesLoading,
    onCoursesError: state.courses.onCoursesError,
    lessons: Object.values(state.lessons.lessons)
})

export default connect(mapState, { saveCourse, deleteCourse, loadCourses, unSubscribeFromCourse })(CoursesComponent);