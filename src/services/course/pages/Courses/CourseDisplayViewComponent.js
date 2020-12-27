import React from 'react';

import { 
connect } from 'react-redux';

import { 
addNewLesson, 
saveLesson } from '../../actions';

import {
role } from '../../../../helpers/pageHelpers';

import { 
Link } from '@reach/router';

import ListItemComponent from '../Components/ListItemComponent';

import {
FileUploadComponent } from '../Components/FileUploadComponent';

import NewLessonPage from '../Lessons/NewLessonPage';
import LoginLogout from '../Login/LoginLogout';
import Roles from '../../pages/Components/roles/Role';
import LessonPlanIframeComponent from '../LessonPlan/LessonPlanIframeComponent';
import CourseDetailCheckBoxComponent from '../Courses/CourseDetailCheckBoxComponent';
import MultiInputEmailComponent from '../Email/MultiInputEmailComponent';

import './CourseDetailPage.css';




const CourseDisplayViewComponent = ({
operatorBusinessName,
operator,   
course,
courseId,
currentUser,
setPreviewEditMode,
previewMode,
lessons,
saveLesson,
lessonDate,
addNewLesson,
courseDetailChildren,
fileUploadUrl,
setFileToRemove,
studentsSubscribedToThisCourse,
setListOfStudents,
sessions,
emailInputOptions,
emailMessageOptions,
setCurrentLesson,
setVideoUrl,
setLessonPlanUrl,
currentLesson,
currentLessonVideoUrl }) => {



 
function onMatchListItem( match, listItem ) {

    if( match ){

        setVideoUrl( listItem?.videoUrl );

        setCurrentLesson( listItem );

        setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${courseId}/${listItem._id}/${listItem.title}`);
    }

} 


return (
            <div className="CourseDetail"> 

            <header>
                
                <h1>{course?.name}</h1>

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
                        operatorBusinessName={operatorBusinessName}
                        user={currentUser} 
                  />

            </header>


    <div className="content"> 

                <div className="sidebar"> 

                <ListItemComponent
                      collection={lessons}
                      onMatchListItem={onMatchListItem}
                      path={"lessons"}

                 >
                     {

                        ( lesson ) => (

                        < NewLessonPage
                            something={lesson.title}
                            className="lesson-item"
                            lessons={lessons}
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
                               
                            </div>  
                            </div>
                            
                          </div>
                         )}
                        </NewLessonPage> 


                         )

                     }

                 </ListItemComponent>    

                <Roles
                    role={currentUser?.role === role.Tutor }
                >
                    < NewLessonPage 
                        className="add-lesson-button"
                        onSubmit={title => addNewLesson(title, courseId, lessonDate )}
                        lessons={lessons}
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
                                            
                       
                    <div className="lesson2">   {courseDetailChildren}  </div> 

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



export default connect(null, { addNewLesson, saveLesson })(CourseDisplayViewComponent);