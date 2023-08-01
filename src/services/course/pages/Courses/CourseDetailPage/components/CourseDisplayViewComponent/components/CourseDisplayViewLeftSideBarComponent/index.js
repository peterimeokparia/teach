import { role } from 'services/course/helpers/PageHelpers';
import NewItemComponent from 'services/course/pages/components/NewItemComponent';
import NewLessonPageDetails from 'services/course/pages/Lessons/NewLessonPage/components/NewLessonPageDetails';
import Roles from 'services/course/pages/components/Roles';
import ListItem from 'services/course/pages/components/ListItem';
import FullTextSearchComponentTest from 'services/course/pages/components/FullTextSearchComponentTest';
import useNewLessonPageHook from 'services/course/pages/Lessons/hooks/useNewLessonPageHook';
import  'services/course/pages/components/styles/course_detail_styles/style.css';
import  'services/course/pages/components/styles/course_detail_outcome_styles/style.css';
import  'services/course/pages/components/styles/sidebar_styles/style.css';

const CourseDisplayViewLeftSideBarComponent = ({ 
    courseDisplayProps, 
    displayProps, 
    onMatchListItem,
}) => {
    let {
        currentUser, searchItem, courseId, onLessonError, saveLessonInProgress, addNewLesson, saveLesson
    } = courseDisplayProps;

    let { 
        lessonsByCourseId, searchItemCollection
    } = displayProps;

    let { 
        newLessonItemProps, 
    } = useNewLessonPageHook( onLessonError, saveLessonInProgress );

    return <div className="sidebar"> 
        {/* <div className="sidebar-search">
        <FullTextSearchComponentTest 
            searchContent={lessonsByCourseId}
            searchKeysPropArray={[ 'title', 'introduction' ]}
            handleSearch={handleSearch}
            searchKeys={[ 'title', 'introduction', 'markDownContent' ]}
            width={300}                  
        />
        </div> */}
        <ListItem
            collection={ searchItem ? searchItemCollection : lessonsByCourseId }
            onMatchListItem={onMatchListItem}
            ul={'course_detail_list'}
            li={'course_detail_list_body'}
            path={"lessons"}
        >
            {( lesson ) => (
                <NewItemComponent
                    className="lesson-item"
                    items={lessonsByCourseId}
                    item={lesson}
                    initialValue={lesson?.title ?? ""}
                    onSubmit={(title) => saveLesson({...lesson, title})}
                    {...newLessonItemProps}
                >
                {( edit, remove, forms ) => (
                    <NewLessonPageDetails
                        edit={edit}
                        remove={remove}
                        forms={forms} 
                        lesson={lesson}
                        {...displayProps}
                        {...courseDisplayProps}
                    />
                )}
                </NewItemComponent>
            )}
        </ListItem>    
        <Roles role={ currentUser?.role === role.Tutor }>
            <NewItemComponent
                className="add-lesson-button"
                items={lessonsByCourseId}
                initialValue={""}
                onSubmit={title => addNewLesson({ title, introduction: title, courseId, lessonDate: Date.now(), userId: currentUser?._id })}
                {...newLessonItemProps} 
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
            </NewItemComponent>
        </Roles>
    </div>;  
};

export default CourseDisplayViewLeftSideBarComponent;


