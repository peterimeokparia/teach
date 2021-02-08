import React from 'react';

import { 
connect } from 'react-redux';

import { 
addNewLesson, 
saveLesson } from '../../actions';

import {
role } from '../../../../helpers/pageHelpers';

import { 
Link,
navigate } from '@reach/router';

import ListItemComponent from '../Components/ListItemComponent';

import {
FileUploadComponent } from '../Components/FileUploadComponent';

import { 
navContent } from  '../Components/navigationHelper.js';

import MainMenu from '../Components/MainMenu';
import NewLessonPage from '../Lessons/NewLessonPage';
import LoginLogout from '../Login/LoginLogout';
import Roles from '../../pages/Components/roles/Role';
import LessonPlanIframeComponent from '../LessonPlan/LessonPlanIframeComponent';
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
emailInputOptions,
emailMessageOptions,
setCurrentLesson,
setVideoUrl,
setLessonPlanUrl,
currentLesson,
currentLessonVideoUrl }) => {


if ( ! currentUser?.userIsValidated || ! operator ){

    navigate(`/${operatorBusinessName}/login`);
}

 
function onMatchListItem( match, listItem ) {

    if( match ){

        setVideoUrl( listItem?.videoUrl );

        setCurrentLesson( listItem );

        setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${courseId}/${listItem._id}/${listItem.title}`);
    }

} 


let navigationContent = navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users;   


return (
            <div className="CourseDetail"> 

            <header>

               <div>

               <h1>{course?.name}</h1>
               <MainMenu 
                    navContent={navigationContent}
                /> 
               </div>
               
                
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

                            { (edit, remove, questions, assignments, exams) => (

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

                                <Roles
                                    role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                                >
                                    <button
                                            className="delete-lesson-btn"
                                            onClick={() => { questions(lesson?._id) }} 
                                        >

                                            Questions

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
                                typeOfUpload={'userlessonfiles'}
                                fileUploadUrl={fileUploadUrl}
                                setFilesToRemove={setFileToRemove}
                            /> 

                    </div>

                                        
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