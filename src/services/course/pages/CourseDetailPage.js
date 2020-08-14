import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Match, navigate, useNavigate, Redirect } from '@reach/router';
import { loadLessons, addNewLesson, saveLesson, togglePreviewMode, getLessonVideoUrl } from '../actions';
import { getLessonsByCourseIdSelector, getCoursesByCourseIdSelector, userOwnsCourse } from '../Selectors';
import { getLastUsersState, updateLessons, deleteLessonFile } from '../api';
import NotFoundPage from './NotFoundPage';
import Loading from './Loading';
import NewLessonPage from './NewLessonPage';
import LoginLogout from './LoginLogout';
import LessonPlanIframeComponent from './LessonPlanIframeComponent';
import FileUpload from './FileUpload';
import { Validations } from  '../../../helpers/validations';
import './TestLayOut.css';


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
       getLessonVideoUrl,
       currentVideoUrl,
      //userOwnsCourse,
       children}) => {


 
  const [ currentLessonVideoUrl, setVideoUrl ] = useState( undefined );
  let [ currentLesson, setCurrentLesson ] = useState( undefined );
  const [ fileToRemove, setFileToRemove ] = useState( undefined );



    useEffect(() => {

        loadLessons( courseId );
        
    }, [ courseId, loadLessons, currentLessonVideoUrl ]);  
      

    

    let courseTitle, videoUrl;  //  needs placeholder
    

    const userOwnsCourse = (user, courseId) => {

        if ( ! user ) {

            return false;
        }
    
        if ( user.userRole === 'admin' ) {
    
            return true;
        }

        return user?.courses?.includes(parseInt(courseId));
    }
 
    
    if ( fileToRemove ) {
    
        // if ( Validations.confirmDelete( fileToRemove ) ){

            currentLesson.files = currentLesson?.files?.filter( files => files !== fileToRemove )

            updateLessons( currentLesson );

            deleteLessonFile( fileToRemove );
        // }
       

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
                            className="preview-btn"
                            onClick={togglePreviewMode}
                        >
                            { previewMode ? 'Preview' : 'Edit' }

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
                                           
                                if( match ){

                                    setVideoUrl( lesson?.videoUrl );

                                    setCurrentLesson( lesson );

                                }
         

                                return <li className={`lesson-item${ match ? '' : '' }` } >
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

                        {/*SIDE BAR 1 */}

                        </div>
                    
                        <div className="lesson"> 
                    
                            <div className=""> 
            
                               {
                                 (currentLessonVideoUrl ) ?      < LessonPlanIframeComponent 
                                                                    name="embed_readwrite" 
                                                                    source={currentLessonVideoUrl}
                                                                    width="500px"
                                                                    height="400px"
                                                                    allow="camera;microphone"
                                                                    scrolling="auto"
                                                                    frameBorder="0" 
                                                                    />
                                                                :    <div> Placeholder</div>
                               

                               }
                              
                            
                            </div>     


                            <div className="lesson2">   {children} </div>       
                            
                            <div> 
                                
                                { 
                                
                                   ( previewMode )  ?   ( 
                                                           <div> 
                                                                <FileUpload lesson={currentLesson}/>

                                                                <div> 

                                                                { currentLesson?.files?.length > 0 && (
                                                            <ul>
                                                                 {
                                                                    currentLesson?.files?.map( (file, index) =>  ( 
                                                                               <li key={index}> 
                                                                                    <Link to={file}> {file?.split('-')[1]} </Link>
                                                                                     <button onClick={() => setFileToRemove(file)}> x </button>  
                                                                                </li> 
                                                                    ) )
                                                                    
                                                                 }
                                                            </ul> 
                                                          )}

                                                                </div>

                                                            </div> 
                                                        )

                                                    :   (<div>
                                                          { currentLesson?.files?.length > 0 && (
                                                             <ul>
                                                                 {
                                                                    currentLesson?.files?.map( (file, index)  =>  ( <li key={index}> <Link to={file}> {file.split('-')[1]} </Link> </li> )  )
                                                                    
                                                                 }
                                                            </ul> 
                                                          )}
                                                         </div> ) 
                                
                                }
                             
                            </div>         
                        </div>
                          {Validations.setErrorMessageContainer()}
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
         currentVideoUrl: state.lessons.currentVideoUrl
        //  userOwnsCourse: userOwnsCourse(state, ownProps)  
    }
}


export default connect(mapState, { loadLessons, addNewLesson, saveLesson, togglePreviewMode, getLessonVideoUrl  })(CourseDetaiPage);