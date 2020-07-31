import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Match, navigate, useNavigate, Redirect } from '@reach/router';
import { loadLessons, addNewLesson, saveLesson, togglePreviewMode } from '../actions';
import { getLessonsByCourseIdSelector, getCoursesByCourseIdSelector, userOwnsCourse } from '../Selectors';
import { getLastUsersState } from '../api';
import NotFoundPage from './NotFoundPage';
import Loading from './Loading';
import NewLessonPage from './NewLessonPage';
import LoginLogout from './LoginLogout';
import './CourseDetailPage.css';


const CourseDetaiPage = ({
       currentUser, 
       courseId,
       isLoading,
       course,
       lessons,
       isLessonsLoading, 
       loadLessons,
       addNewLesson,
       saveLesson,
       togglePreviewMode,
       previewMode,
    //    userOwnsCourse,
       children}) => {


 
    useEffect(() => {

        loadLessons( courseId );
        
    }, [ courseId, loadLessons ]);  

    

    let courseTitle; 
   

    const userOwnsCourse = (user, courseId) => {

        if ( ! user ) {

            return false;
        }
    
        if ( user.userRole === 'admin' ) {
    
            return true;
        }

        return user?.courses?.includes(parseInt(courseId));
    }
 


    if ((! userOwnsCourse( currentUser, courseId )) && (! getLastUsersState()?.courses?.includes(parseInt(courseId)))) {
  
        return <Redirect to={`/courses/${courseId}/buy`} noThrow/>
    }     

    

    if( isLoading ){
       return <Loading />  
    }


    if( ! course ){
        return <NotFoundPage />  
    }


    if( isLessonsLoading ){
        return <Loading />  
    }


    return (     
                <div className="CourseDetail">
                     
                     {courseTitle = course?.name}

                    <header>
                        <h1>{course.name}</h1>
                        <button
                            className="something"
                            onClick={togglePreviewMode}
                        >
                            { previewMode ? 'Edit' : 'Preview' }

                        </button>
                        <LoginLogout />
                    </header>


                    <div className="content">
                    <div className="sidebar">
                    { lessons.length > 0 && ( 
                        <ul className="lessons">
                            {lessons.map(lesson => 
                            (
                             <Match 
                                   key={lesson.id}
                                   path={`lessons/${lesson.id}`}>   
                              {({ match } ) => {  
                                                       
                                return <li className={`lesson-item ${ match ? 'selected' : '' }` } >
                                    < NewLessonPage
                                             something={lesson.title}
                                             className="lesson-item"
                                             lesson={lesson}
                                             onSubmit={(title) => saveLesson({...lesson, title})}
                                    >
                                    { (edit, remove) => (  
                                    <div>      
                                        <div>
                                            <Link to={`lessons/${lesson.id}`}> <span>{ lesson?.title } </span> </Link> 

                                            <div> 

                                            <button 
                                                className="edit-lesson-btn"
                                                onClick={() => { edit(lesson.title) } }                                          
                                            > 
                                                    Edit
                                                    
                                            </button>

                                            <button
                                                className="delete-lesson-btn"
                                                onClick={remove} 
                                            >

                                                Delete

                                            </button>

                                            <button
                                                className="plan-lesson-btn"
                                                 onClick={()=> navigate(`/LessonPlan/${courseId}/${lesson.id}/${lesson.title}`)}
                                    
                                            >

                                                Teach

                                            </button>
                                        </div>  
                                        </div>
                                        
                                      </div>
                                     )}
                                    </NewLessonPage> 
                                </li>
                                }}
                             </Match>
                            ))}
                                
                         </ul>
                    )}     
                        < NewLessonPage 
                                 className="add-lesson-button"
                                 onSubmit={title => addNewLesson(title, courseId)}
                        >
                           { (edit) =>  (
                                   <button 
                                     className="add-lesson-button"
                                     onClick={edit}> 
                                   Add New Lesson
                                </button>
                           ) }
                        </NewLessonPage>
                  
                       </div>
                
                    <div className="sidebar">
                         
                    <div className=""/>
                        {children}
                    </div>
 
                    </div>
                   
                </div> 
            
            );
}


const mapState = (state, ownProps) => {

     return {
         currentUser: state.users.user,
         previewMode: state.app.previewMode,
         isLessonsLoading:state.lessons.lessonsLoading,
         isLoading: state.courses.coursesLoading,
         course: getCoursesByCourseIdSelector( state, ownProps ),
         lessons: getLessonsByCourseIdSelector( state, ownProps ),
        //  userOwnsCourse: userOwnsCourse(state, ownProps)  
    }
}


export default connect(mapState, { loadLessons, addNewLesson, saveLesson, togglePreviewMode  })(CourseDetaiPage);