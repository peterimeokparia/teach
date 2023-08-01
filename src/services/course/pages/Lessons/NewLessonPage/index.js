import { useState } from 'react';
import { connect } from 'react-redux';
import { resetLessonError, deleteLesson } from 'services/course/actions/lessons';
import { forms } from 'services/course/pages/Lessons/NewLessonPage/helpers';
import NewItemComponent from '../../components/NewItemComponent';
import './style.css';

const NewLessonPage = ({
    resetLessonError, 
    saveLessonInProgress, 
    lesson,
    lessons,
    error,
    className,
    onSubmit,
    deleteLesson,
    children 
}) => {
    const initialValue = lesson ? lesson?.title : '';
    const [ title, setTitle ] = useState(initialValue);
    const newItemProps = {
        resetItemError: resetLessonError, 
        saveItemInProgress: saveLessonInProgress, 
        item: lesson,
        items: lessons,
        error,
        className,
        onSubmit,
        deleteItemAction: deleteLesson,
        setField:setTitle,
        fieldValue: title,
        placeholder: "add your new lesson",
        initialValue,
        inputType: 'text',
        editItem: false,
        forms,
        children
    };
    return ( <NewItemComponent {...newItemProps}/>);    
};
const mapState = ( state, ownProps ) => {
    return {
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        error: state.lessons.onSaveLessonError
    };
};

export default connect(mapState, {resetLessonError, deleteLesson} )(NewLessonPage);