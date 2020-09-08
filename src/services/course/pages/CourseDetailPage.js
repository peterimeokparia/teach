import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Match, navigate, useNavigate, Redirect } from '@reach/router';
import { loadLessons, addNewLesson, saveLesson, togglePreviewMode, getLessonVideoUrl, updateUserInvitationUrl, setLessonInProgressStatus, addNewMeeting} from '../actions';
import { getLessonsByCourseIdSelector, getCoursesByCourseIdSelector, userOwnsCourse } from '../Selectors';
import { getLastUsersState, updateLessons, deleteLessonFile } from '../api';
import NotFoundPage from './NotFoundPage';
import Loading from './Loading';
import NewLessonPage from './NewLessonPage';
import LoginLogout from './LoginLogout';
import LessonPlanIframeComponent from './LessonPlanIframeComponent';
import CheckBoxComponent from './CheckBoxComponent';
import FileUpload from './FileUpload';
import { Validations } from  '../../../helpers/validations';
import './CourseDetailPage.css';


const CourseDetaiPage = ({
       currentUser, 
       courseId,
       isCourseLoading,
       course,
       lessons,
       isLessonsLoading, 
       loadLessons,
       addNewLesson,
       saveLesson,
       togglePreviewMode,
       previewMode,
       setLessonInProgressStatus,
       studentsSubscribedToThisCourse,
       updateUserInvitationUrl,
       addNewMeeting,
       lessonStarted,
       onLessonError,
       children}) => {



  const [ currentLessonVideoUrl, setVideoUrl ] = useState( undefined );
  let  [ currentLesson, setCurrentLesson ] = useState( undefined );
  const [ fileToRemove, setFileToRemove ] = useState( undefined );
  const [ lessonPlanUrl, setLessonPlanUrl ] = useState( "" );
  const [ teachPlatformEnabled, setTeachPlatform ] = useState( false );
  const [ inviteeList, setInviteeList ] = useState([]);



    useEffect(() => {

        loadLessons( courseId );
        
    }, [ courseId,  loadLessons, currentLessonVideoUrl ]);  
      


    const userOwnsCourse = (user, courseId) => {

        if ( ! user ) {

            return false;
        }
    
        if ( user.userRole === 'admin' ) {
    
            return true;
        }

        return user?.courses?.includes(courseId);
        // return user?.courses?.includes(parseInt(courseId));
    }
 
    
    if ( fileToRemove ) {
    
        // if ( Validations.confirmDelete( fileToRemove ) ){

            currentLesson.files = currentLesson?.files?.filter( files => files !== fileToRemove )

            updateLessons( currentLesson );

            deleteLessonFile( fileToRemove );
        // }
       

    }
    

    if ((! userOwnsCourse( currentUser, courseId )) && (! getLastUsersState()?.courses?.includes(courseId))) {
  
        return <Redirect to={`/courses/${courseId}/buy`} noThrow/>
    }     

    

    if( isCourseLoading ){

     return <Loading />  
    }


    if( ! course ){
        
     return <NotFoundPage />  
    }


    if( isLessonsLoading ){

     return <Loading />  
    }


    if ( onLessonError ) {

     return <div> { onLessonError.message } </div> ;
    }


    const enableTeachPlatform = () => {
        
       if ( ! currentLesson ) {

        Validations.itemNotSelected( currentLesson,  "Click on the lesson title link before clicking on 'Teach'" )
       }

        navigate( lessonPlanUrl );

        setTeachPlatform(true);

        setLessonInProgressStatus();

        inviteStudentsToLearningSession(currentLesson);
         
    }


    const inviteStudentsToLearningSession = (courseLesson) => {
     
        let invitees = [];
        
        inviteeList.map(invitee => {
    
          let setInvitationUrl =  window.location.href + `/${invitee?._id}`;
          let nameOfLessonInProgress = courseLesson.title;     
          let lessonInProgress = true;    

          invitees.push( invitee?._id );
    
           updateUserInvitationUrl(invitee, setInvitationUrl, nameOfLessonInProgress, lessonInProgress); 

        });
 
          addNewMeeting(
                // inviteeList,
                invitees, 
                currentUser?._id, 
                Date.now(), 
                courseId, 
                courseLesson?._id,
                course?.name,
                courseLesson?.title,
                "http://localhost:3000" + lessonPlanUrl,
                currentUser
         )

    }



    return (     

             <div className="CourseDetail"> 
                            
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
                                   key={lesson._id}
                                   path={`lessons/${lesson._id}`}>   
                              {({ match } ) => {  
                                           
                                if( match ){

                                    setVideoUrl( lesson?.videoUrl );

                                    setCurrentLesson( lesson );

                                    setLessonPlanUrl(`/LessonPlan/${courseId}/${lesson._id}/${lesson.title}`);

                                }
         

                                return <li className={`lesson-item${ match ? '' : '' }` } >
                                    < NewLessonPage
                                             something={lesson.title}
                                             className="lesson-item"
                                             lesson={lesson}
                                             courseId={courseId}
                                             onSubmit={(title) => saveLesson({...lesson, title})}
                                    >
                                    { (edit, remove) => (  
                                    <div>      
                                        <div>
                                            <Link to={`lessons/${lesson._id}`}> <span>{ lesson?.title } </span> </Link> 

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
                                                onClick={enableTeachPlatform}
                                                 //onClick={()=> navigate(`/LessonPlan/${courseId}/${lesson._id}/${lesson.title}`)}
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
                                 courseId={courseId}
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
                    
                            <div> 
            
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
                                                                    currentLesson?.files?.map( (file, index)  =>  ( <li key={index}> <Link to={file}> {file?.split('-')[1]} </Link> </li> )  )
                                                                    
                                                                 }
                                                            </ul> 
                                                          )}
                                                         </div> ) 
                                
                                }
                             
                            </div>         
                        </div>
                            { currentUser?.role === "Tutor" && <div className="sidebar"> 
                                 <div>
                                 <CheckBoxComponent 
                                        collection={studentsSubscribedToThisCourse}
                                        setCollection={meetingInvitees => setInviteeList(meetingInvitees)}
                                        description={"firstname"}
                                        lessonTitle={currentLesson?.title}
                                /> 
                                </div>
                             </div>
                            }
                          {Validations.setErrorMessageContainer()}
                        </div>
                </div>
            
            );
}


const mapDispatch = {
    loadLessons, 
    addNewLesson, 
    saveLesson, 
    togglePreviewMode, 
    getLessonVideoUrl, 
    updateUserInvitationUrl,
    setLessonInProgressStatus, 
    addNewMeeting
}

const mapState = (state, ownProps) => {

     return {
         currentUser: state.users.user,
         previewMode: state.app.previewMode,
         isLessonsLoading:state.lessons.lessonsLoading,
         isCourseLoading: state.courses.coursesLoading,
         onLessonError: state.lessons.onSaveLessonError,
         course: getCoursesByCourseIdSelector( state, ownProps ),
         lessons: getLessonsByCourseIdSelector( state, ownProps ),
         currentVideoUrl: state.lessons.currentVideoUrl,
         studentsSubscribedToThisCourse : Object.values(state?.users?.users)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
         lessonStarted: state.lessons.lessonStarted,
         //  userOwnsCourse: userOwnsCourse(state, ownProps)  
    }
}


export default connect(mapState, mapDispatch)(CourseDetaiPage);