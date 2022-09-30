import { connect } from 'react-redux';
import { role } from 'services/course/helpers/PageHelpers';
import { deleteFileByFileName } from 'services/course/api';
import { setItemInSessionStorage } from 'services/course/helpers/ServerHelper';
import { lessonHeaderEditIconStyle ,sideBarEditIconStyle,sideBarDeleteIconStyle,sideBarHomeWorkIconStyle,sideBarHelpIconStyle,
    swapHorizIconStyle, calendarStyle, sideBarFurtherStudyIconStyle } from '../inlineStyles';
import {formTypes } from 'services/course/pages/FormBuilder/helpers';
import { eventEnum } from 'services/course/pages/CalendarPage/helpers';
import { goToCalendar } from 'services/course/pages/Users/helpers';
import { incrementDisplayedItemCount, toggleDisplayedItems } from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/helpers';
import { mapState, mapDispatch } from './connector';
import { setSelectedOutcome, toggleConcepts } from 'services/course/actions/outcomes';
import { restrictTextLength } from 'services/course/pages/Courses/helpers';
import { Link } from '@reach/router';
import useCourseDisplayHook from 'services/course/pages/Courses/hooks/useCourseDisplayHook';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MainMenu from 'services/course/pages/components/MainMenu';
import NewLessonPage from 'services/course/pages/Lessons/NewLessonPage';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import Roles from 'services/course/pages/components/Roles';
import ListItem from 'services/course/pages/components/ListItem';
import FullTextSearchComponentTest from 'services/course/pages/components/FullTextSearchComponentTest';
import QuestionOutcomeComponent from 'services/course/pages/FormBuilder/FormQuestions/components/QuestionOutcomeComponent';
import  'services/course/pages/components/styles/course_detail_styles/style.css';
import  'services/course/pages/components/styles/course_detail_outcome_styles/style.css';
import  'services/course/pages/components/styles/sidebar_styles/style.css';

const CourseDisplayViewComponent = ({
    saveFormBuilder,
    previewMode,
    saveLesson,
    outcomes,
    addNewLesson,
    startLesson,
    onLessonError,
    courseId,
    lessonId,
    calendars,
    calendar,
    addCalendar,
    addNotes,
    loadAllNotes,
    allNotes,
    users,
    courses,
    selectedTutorId,
    setLessonPlanUrl,
    setCurrentLesson,
    course,
    lessons,
    togglePreviewMode,
    toggleQuestionModal,
    searchItem,
    operatorBusinessName,
    operator,
    courseDetailChildren,
    currentUser, 
    selectedLessonPlanLesson,
    event,
    concepts,
    selectedOutcome,
    toggleConcepts,
    setSelectedOutcome,
    allEvents,
    studentsNote,
    tutorsNote }) => {
    let courseDisplayProps = {
        currentUser, course, courses, lessons, selectedTutorId, setCurrentLesson, searchItem,
        setLessonPlanUrl, previewMode, selectedLessonPlanLesson, togglePreviewMode, saveLesson, setItemInSessionStorage,
        deleteFileByFileName, startLesson, users, calendars, calendar, addCalendar, operatorBusinessName, concepts,
        operator, courseId, lessonId, event, allEvents, addNotes, loadAllNotes, allNotes, studentsNote, tutorsNote,
    };
    let {
        onMatchListItem, setPreviewEditMode, navigationContent, selectedCourse, 
        lessonItem, toggleLessonItemDisplayCount, setToggleLessonItemDisplayCount, 
        lessonsByCourseId, startLessonSession, calendarProps, formProps, searchItemCollection, 
        handleSearch, resetSelectedSearchItem
    } = useCourseDisplayHook( courseDisplayProps );
   
    const updateQuestionOutcomeId = ( outcome ) => {
        setSelectedOutcome( outcome );
    }

return (
    <div className="CourseDetail"> 
        <header>
            <div>
            <MainMenu navContent={navigationContent} />
             <div className="multiColor"> { ( courseId ) ? selectedCourse?.name : course?.name} </div>
            </div>
            <>
            { courseDetailChildren }
            </>
            <Roles role={ currentUser?.role === role.Tutor }>
                <EditIcon 
                    onClick={setPreviewEditMode}
                    color="action"
                    className="comment-round-button-1"
                    style={ lessonHeaderEditIconStyle() }
                />
            </Roles>
            <LoginLogout
                operatorBusinessName={operatorBusinessName}
                user={currentUser} 
                operator={operator}
            />
        </header>
        <div className={'content'}> 
                <div className="sidebar"> 
                <div className="sidebar-search">
                <FullTextSearchComponentTest 
                    searchContent={lessonsByCourseId}
                    searchKeysPropArray={[ 'title', 'introduction' ]}
                    handleSearch={handleSearch}
                    searchKeys={[ 'title', 'introduction', 'markDownContent' ]}
                    width={300}                  
                />
                </div>
                <ListItem
                    collection={ searchItem ? searchItemCollection : lessonsByCourseId }
                    onMatchListItem={onMatchListItem}
                    ul={'course_detail_list'}
                    li={'course_detail_list_body'}
                    path={"lessons"}
                >
                    {( lesson ) => (
                        < NewLessonPage
                            className="lesson-item"
                            lessons={lessonsByCourseId}
                            lesson={lesson}
                            courseId={courseId}
                            onSubmit={(title) => saveLesson({...lesson, title})}
                            operatorBusinessName={ operatorBusinessName }
                        >
                        { (edit, remove, forms) => (
                           <div>
                            <div onClick={resetSelectedSearchItem}>
                            {
                              <Link to={`lessons/${lesson._id}`}> <span title={lesson?._id} className="lessonMultiColor">{ restrictTextLength( lesson?.title, 10, 10 ) }</span></Link>
                            } 
                            </div>
                            <div className="row justify-content-center"> 
                                <span>
                                <SportsScoreIcon 
                                    onClick={() => startLessonSession()}
                                    color="action"
                                    className="comment-round-button-2"
                                    style={ calendarStyle() }
                                />
                                <CalendarMonthIcon 
                                    onClick={() => goToCalendar( calendarProps, currentUser, eventEnum?.Lessons )}
                                    color="action"
                                    className="comment-round-button-4"
                                    style={ calendarStyle() }
                                />
                                </span>
                            </div>
                            <div className="row justify-content-center">
                            <span> 
                            <Roles role={ currentUser?.role === role.Tutor }>
                                <EditIcon 
                                    onClick={() => { edit(lesson.title); } }
                                    color="action"
                                    className="comment-round-button-1"
                                    style={ sideBarEditIconStyle() }
                                />
                            </Roles>
                            <Roles role={currentUser?.role === role.Tutor }>
                                <DeleteIcon 
                                    onClick={remove}
                                    color="action"
                                    className="comment-round-button-3"
                                    style={ sideBarDeleteIconStyle() }
                                />
                            </Roles>
                                <HelpIcon 
                                    onClick={() => { forms( lesson, formTypes.quizzwithpoints, formProps ); } }
                                    color="action"
                                    className="comment-round-button-2"
                                    style={ sideBarHelpIconStyle(currentUser) }
                                />
                                <HomeOutlinedIcon 
                                    onClick={() => { forms( lesson, formTypes.homework, formProps ); } }
                                    color="action"
                                    className="comment-round-button-4"
                                    style={ sideBarHomeWorkIconStyle() }
                                />
                                <AutoStoriesIcon
                                    onClick={() => { forms( lesson, formTypes.furtherstudy, formProps ); } }
                                    color="action"
                                    className="comment-round-button-9"
                                    style={ sideBarFurtherStudyIconStyle() }
                                />
                                <SwapHorizIcon 
                                    onClick={() => incrementDisplayedItemCount(  toggleLessonItemDisplayCount, setToggleLessonItemDisplayCount ) }
                                    color="action"
                                    className="comment-round-button-6"
                                    style={ swapHorizIconStyle() }
                                />
                            </span> 
                            </div>   
                        </div>
                        )}
                        </NewLessonPage> 
                    )}
                </ListItem>    
                <Roles role={currentUser?.role === role.Tutor } >
                    < NewLessonPage 
                        className="add-lesson-button"
                        onSubmit={title => addNewLesson(title, title, courseId, Date.now(), currentUser?._id)} 
                        lessons={lessonsByCourseId}
                        courseId={courseId}
                    >
                        {(edit) =>  (
                            <div>
                            <button 
                                className="add-lesson-button"
                                onClick={edit}> 
                                Add New Lesson
                            </button>
                            { onLessonError && onLessonError?.message  }
                            </div>
                        )}
                    </NewLessonPage>
                </Roles>
                {/*SIDE BAR 1 */}
                </div>     
                <div className="lesson-content"> 
                    <div className="lesson2"/>   
                    <div className="toggleItems"> 
                    {
                       lessonItem && 
                       toggleDisplayedItems( toggleLessonItemDisplayCount, selectedLessonPlanLesson ?? lessonItem, 
                            courseDisplayProps, outcomes.filter(lessonOutcome => lessonOutcome?.lessonId === lessonItem?._id)
                        )  
                    }
                    </div> 
                </div>
                <div className="sidebar-2"> 
                { concepts &&
                <div>
                    <ListItem
                        collection={ outcomes.filter(lessonOutcome => lessonOutcome?.lessonId === lessonItem?._id  ) }
                        onMatchListItem={onMatchListItem}
                        ul={'sidebar_list'}
                        li={'sidebar_list_body'}
                        path={"lessons"}
                    >
                        {( outcome, index ) => (
                        <QuestionOutcomeComponent 
                            outcome={outcome}
                            index={index}
                            handleOnBlur={() => toggleConcepts}
                        >
                        {( outcome ) => 
                            <HelpIcon 
                                onClick={() => { updateQuestionOutcomeId(outcome) }}
                                color="action"
                                className="comment-round-button-4"
                            /> 
                        }
                        </QuestionOutcomeComponent>  
                        )}
                    </ListItem>  
                </div>       
                }
            </div>            
        </div>
    </div>
    );
};

export default connect( mapState, mapDispatch )(CourseDisplayViewComponent); 