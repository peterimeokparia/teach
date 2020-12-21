import React, { useEffect, useState } from 'react';

import { 
connect } from 'react-redux';

import { 
Link, 
Match, 
navigate, 
Redirect } from '@reach/router';

import { 
loadLessons,
addNewLesson, 
saveLesson, 
togglePreviewMode, 
getLessonVideoUrl, 
updateUserInvitationUrl, 
setLessonInProgressStatus, 
addNewMeeting, 
decrementSessionCountForPackageOptions, 
incrementSessionCount, 
autoRenewSessionPackages,
setAutoRenewPackageStatus, 
loadSessions} from '../actions';

import { 
getLessonsByCourseIdSelector, 
getCoursesByCourseIdSelector } from '../Selectors';

import { 
getLastUsersState, 
updateLessons, 
deleteLessonFileByFileName } from '../api';

import { 
Validations } from  '../../../helpers/validations';

import { 
//handleAutoRenewPackageSessions, 
meetingConfigSettings,
sendRenewalNotification,
checkIfPackageIsSetToAutoRenew,
autoRenewProcess } from  '../../../helpers/courseDetailPageHelpers';

import { 
forceReload } from '../../../helpers/serverHelper';

import {
role } from '../../../helpers/pageHelpers';

import { 
toast } from 'react-toastify';

import {
FileUploadComponent } from './components/FileUploadComponent';

import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './NotFoundPage';
import Loading from './Loading';
import NewLessonPage from './NewLessonPage';
import LoginLogout from './LoginLogout';
import LessonPlanIframeComponent from './LessonPlanIframeComponent';
import CourseDetailCheckBoxComponent from './CourseDetailCheckBoxComponent';
import MultiInputEmailComponent from './MultiInputEmailComponent';
import Roles from './components/roles/Role';
import Swal from 'sweetalert2';
import './CourseDetailPage.css';



const ClassRoomPage = ({
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
loadSessions,
addNewMeeting,
sessions,
onLessonError,
onSessionRenewal,
autoRenewSessionPackages,
setAutoRenewPackageStatus,
children}) => {


const [ currentLessonVideoUrl, setVideoUrl ] = useState( undefined );
const [ fileToRemove, setFileToRemove ] = useState( undefined );
const [ lessonPlanUrl, setLessonPlanUrl ] = useState( "" );
const [ teachPlatformEnabled, setTeachPlatform ] = useState( false );
const [ listOfStudents, setListOfStudents ] = useState([]);
let  [ currentLesson, setCurrentLesson ] = useState( undefined );
let lessonTitle = currentLesson?.title?.replace(/\s+/g, "%20");
let invitationUrl = `http://localhost:3000/LessonPlan/invite/userverification/${courseId}/${currentLesson?._id}/${lessonTitle}`;
const fileUploadUrl = 'http://localhost:9005/api/v1/fileUploads';
const session = sessions?.find( currentSession => currentSession?.userId === currentUser?._id );



useEffect(() => {

    loadLessons( courseId );

    if ( onSessionRenewal && currentUser.role === "Student" ) {

         loadSessions();

         setAutoRenewPackageStatus( { ...currentUser, paymentStatus:"" } );

         sendRenewalNotification( currentUser, { ...session, numberOfSessions: 0 }, onSessionRenewal );

         setTeachSessionSettings();
    
         Swal.fire('Package renewed successfully!')
         .then( ( resp ) => {

            if ( resp.value ) {
                navigate( lessonPlanUrl )
            }
            }
        )
    }
    
}, [ courseId,  loadLessons,  currentLessonVideoUrl, lessonPlanUrl, onSessionRenewal ]);  
    


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

    currentLesson.files = currentLesson?.files?.filter( files => files !== fileToRemove )

    updateLessons( currentLesson );

    deleteLessonFileByFileName( fileToRemove?.split('/files/')[1]);       
}



if ((! userOwnsCourse( currentUser, courseId )) && (! getLastUsersState()?.courses?.includes(courseId))) {

    return <Redirect to={`/courses/${courseId}/buy`} noThrow/>
}     



if ( isCourseLoading ){

    return <Loading />  
}


if ( ! course ){
    
    return <NotFoundPage />  
}


if ( isLessonsLoading ){

    return <Loading />  
}


if ( onLessonError ) {

    return <div> { onLessonError.message } </div> ;
}


const enableTeachPlatform = () => {

    if ( ! currentLesson ) {

        toast.error("Please click on the lesson link.")

        return;  
    }


    if ( currentUser?.role === "Tutor" && listOfStudents?.length === 0 ) {

        toast.error("Please invite a student.")

        return;  
    }

    try {         
   
       
        if ( checkIfPackageIsSetToAutoRenew( currentUser,  {...session, numberOfSessions: onSessionRenewal ? 0 : session?.numberOfSessions } ) ) {
         
             handleAutoRenewPackageSessions( currentUser, session, onSessionRenewal );
  
         } else {

            setTeachSessionSettings();

            navigate( lessonPlanUrl ); 
            
        }

                                
                    
    } catch (error) {

        console.log( error );
        
    }
}




const inviteStudentsToLearningSession = ( user, courseLesson, currentSessions, studentsEnrolledInThisCourse ) => {

    let invitees = [];

    if ( user?.role === "Tutor"  ) {
            
        studentsEnrolledInThisCourse.map(invitee => {

        const usersSession = currentSessions?.find( currentSession => currentSession?.userId === invitee?._id );
        
        const userHasExhaustedPackageSessions = ( usersSession?.numberOfSessions === usersSession?.totalNumberOfSessions  && usersSession?.typeOfSession === "Package" )

        if ( userHasExhaustedPackageSessions ) {
                
            return;
        }
    
        let setInvitationUrl =  window.location.href + `/${invitee?._id}`;
        let nameOfLessonInProgress = courseLesson.title;     
        let lessonInProgress = true;    

        invitees.push( invitee?._id );
    
            updateUserInvitationUrl(invitee, setInvitationUrl, nameOfLessonInProgress, lessonInProgress); 
        });

    }

    return invitees;
}




const setPreviewEditMode = () => {

    if ( ! currentLesson ) {

        toast.error("Please click on the lesson link.")

        return;  
    }

    togglePreviewMode();
    
}



let emailMessageOptions = {
        from: "teachpadsconnect247@gmail.com",
        subject: "Hey! Join my lesson!",
        messageBody: invitationUrl,
        userId: currentUser?._id
}


let emailInputOptions = {
        name:"inputO",
        type:"email",
        placeHolder:"Invite your friends!"
}




function handleAutoRenewPackageSessions( currentUser,  currentSession ) {

        if ( currentSession?.autoRenew ) {

            Swal.fire( "Your package is set for renewal. Click 'Ok' to continue..." ).
                then( ( response )  => {

                    if ( response ) {

                        autoRenewProcess( currentUser, currentSession, autoRenewSessionPackages );

                        return;
                    }
                    
                });
    
              return;

        } else {

            Swal.fire({
                title: `Package has expired. Do you want to renew this package?.  ${currentUser?.nameOfLessonInProgress}`,
                icon: 'question',
                // html: currentUser?.cart?.map((item, index) => '<ul><li key=' + `${index}` + '>' + `${item?.name}` + '</li></ul') + "Do you still want to log out?",
                showCancelButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#673ab7',
                cancelButtonText: 'No'
    
            }).then( (response) => {
    
                if ( response?.value ) {
    
                    autoRenewProcess( currentUser, currentSession, autoRenewSessionPackages );
                    return;  
    
                } else {
                
                    Swal.fire( `Please contact your tutor or the administrator.` );
    
                    return;
                }
    
            });

        }          
 }



 function setTeachSessionSettings(){

        setTeachPlatform(true);

        setLessonInProgressStatus();

        let invitees = inviteStudentsToLearningSession( currentUser, currentLesson, sessions, listOfStudents ); 
        
        addNewMeeting(
            invitees, 
            currentUser?._id,
            sessions, 
            Date.now(), 
            courseId, 
            currentLesson?._id,
            course?.name,
            currentLesson?.title,
            "http://localhost:3000" + lessonPlanUrl,
            currentUser
        )
 }


    return (     

             <div className="CourseDetail"> 

                    <header>
                        
                        <h1>{course.name}</h1>

                          <Roles
                              role={currentUser?.role === role.Tutor }
                            >
                                   <button
                                        className="preview-btn"
                                        onClick={setPreviewEditMode}
                                        >
                                        { previewMode ? 'Preview' : 'Edit' }

                                    </button>
                            </Roles>

                            <LoginLogout
                                 user={currentUser}
                            />

                    </header>


            <div className="content"> 

                        <div className="sidebar"> 

                        { lessons.length > 0 && ( 

                        <ul className="lessons">

                          { lessons.map(lesson => 
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
         

                        return <li className="lesson-item" >

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

                                            <Link to={`lessons/${lesson._id}`}> <span title={lesson?._id} >{ lesson?.title } </span> </Link> 

                                          <div> 

                                          <Roles
                                             role={currentUser?.role === role.Tutor }
                                          >
                                                <button 
                                                    className="edit-lesson-btn"
                                                    onClick={() => { edit(lesson.title) } }                                          
                                                > 
                                                    Edit
                                                        
                                                </button>

                                          </Roles>

                                          <Roles
                                             role={currentUser?.role === role.Tutor }
                                          >
                                               <button
                                                    className="delete-lesson-btn"
                                                    onClick={remove} 
                                                >

                                                    Delete

                                               </button>

                                          </Roles>
                                           
                                            <button
                                                className="plan-lesson-btn"
                                                onClick={enableTeachPlatform}
                                            >

                                                { currentUser?.role === role.Tutor ? "Teach"  : "Join" }
 
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

                        <Roles
                            role={currentUser?.role === role.Tutor }
                        >
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
                        </Roles>
                                           
                        {/*SIDE BAR 1 */}

                        </div>
                    
                        <div className="lesson"> 
                         
                             < LessonPlanIframeComponent
                                    name="embed_readwrite" 
                                    source={currentLessonVideoUrl}
                                    width="500px"
                                    height="400px"
                                    allow="camera;microphone"
                                    scrolling="auto"
                                    frameBorder="0" 
                            />
                                                    
                               
                            <div className="lesson2">   {children}  </div> 

                                < FileUploadComponent
                                    previewMode={previewMode}
                                    currentLesson={currentLesson}
                                    fileUploadUrl={fileUploadUrl}
                                    setFilesToRemove={setFileToRemove}
                                /> 

                           </div>
                       
                             <Roles
                                role={currentUser?.role === role.Tutor }
                              >
                                   <div className="sidebar"> 
                                        <CourseDetailCheckBoxComponent 
                                            collection={studentsSubscribedToThisCourse}
                                            setCollection={meetingInvitees => setListOfStudents(meetingInvitees)}
                                            description={"firstname"}
                                            lessonTitle={currentLesson?.title}
                                            sessions={sessions}
                                        /> 
                                   </div>
                              </Roles>
                       
                            
                              <Roles
                                role={currentUser?.role === role.Student }
                              >
                                   <div className="sidebar"> 
                                        <MultiInputEmailComponent
                                            setLesson={currentLesson}
                                            inputFieldOptions={emailInputOptions}
                                            messageOptions={emailMessageOptions} 
                                        />
                                   </div>
                              </Roles>
                              
                        </div>
                </div>
            
            );
}


const mapDispatch = {
    loadSessions,
    loadLessons, 
    addNewLesson, 
    saveLesson, 
    togglePreviewMode, 
    getLessonVideoUrl, 
    updateUserInvitationUrl,
    setLessonInProgressStatus, 
    addNewMeeting,
    decrementSessionCountForPackageOptions,
    incrementSessionCount,
    autoRenewSessionPackages,
    setAutoRenewPackageStatus
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
         sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
         onSessionRenewal: state.sessions.autoRenewedPackageSuccess
         //userOwnsCourse: userOwnsCourse(state, ownProps)
         //session: Object.values(state?.sessions?.sessions)?.find(session => session?.courseId === ownProps?.courseId && (ownProps?.currentUser?.role === "Tutor" ? (ownProps?.currentUser?._id === session?.tutorId) : (ownProps?.currentUser?._id === session?.userId) )),  
    }
}


export default connect(mapState, mapDispatch)(ClassRoomPage);