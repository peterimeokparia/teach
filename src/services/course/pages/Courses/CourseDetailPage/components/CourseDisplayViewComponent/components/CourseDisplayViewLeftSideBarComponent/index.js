import { role } from 'services/course/helpers/PageHelpers';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import { eventEnum } from 'services/course/pages/CalendarPage/helpers';
import { goToCalendar } from 'services/course/pages/Users/helpers';
import { incrementDisplayedItemCount } from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/helpers';
import { restrictTextLength } from 'services/course/helpers/PageHelpers';
import { Link } from '@reach/router';
import { sideBarEditIconStyle, sideBarDeleteIconStyle,sideBarHomeWorkIconStyle,sideBarHelpIconStyle,
    swapHorizIconStyle, calendarStyle, sideBarFurtherStudyIconStyle } from 'services/course/pages/Courses/CourseDetailPage/components/inlineStyles';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import NewLessonPage from 'services/course/pages/Lessons/NewLessonPage';
import Roles from 'services/course/pages/components/Roles';
import ListItem from 'services/course/pages/components/ListItem';
import FullTextSearchComponentTest from 'services/course/pages/components/FullTextSearchComponentTest';
import  'services/course/pages/components/styles/course_detail_styles/style.css';
import  'services/course/pages/components/styles/course_detail_outcome_styles/style.css';
import  'services/course/pages/components/styles/sidebar_styles/style.css';

const CourseDisplayViewLeftSideBarComponent = ({ courseDisplayProps, displayProps, onMatchListItem }) => {
    let {
        currentUser, searchItem, saveLesson, operatorBusinessName, courseId, onLessonError, addNewLesson
    } = courseDisplayProps;

    let { 
        toggleLessonItemDisplayCount, setToggleLessonItemDisplayCount, lessonsByCourseId, startLessonSession, calendarProps, 
        formProps, searchItemCollection, handleSearch, resetSelectedSearchItem
    } = displayProps;

    return <div className="sidebar"> 
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
                            onClick={() => { forms( lesson, formTypes.lessoninsights, formProps ); } }
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
    </div>  
}

export default CourseDisplayViewLeftSideBarComponent;


