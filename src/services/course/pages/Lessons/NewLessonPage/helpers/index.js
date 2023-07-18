import { navigate } from '@reach/router';
import { v4 as uuidv4 } from 'uuid';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';

    const generateUuid = () => {
        const uuid = uuidv4();

        return uuid;
    };

export const forms = ( lesson, typeOfForm, formProps ) => {
    buildFormBuilderRoute( lesson, typeOfForm, formProps  );    
};

function buildFormBuilderRoute( lesson, typeOfForm, formProps ){
    
    let { operatorBusinessName, currentUser } = formProps;

    let props = {
        operatorBusinessName, currentUser, uuid: generateUuid(), lesson,
        userId: currentUser?._id, courseId: lesson?.courseId, lessonId: lesson?._id
    };

    switch ( typeOfForm ) {
        case formTypes.quizzwithpoints:   
            handleQuizz(props);
            break;
        case formTypes.homework: 
            handleHomeWork(props);
            break;
        case formTypes.furtherstudy: 
            handleFurtherStudy(props);
            break;    
        case formTypes.lessoninsights: 
            handleLessonInsights(props);
            break;    
        default:
            break;     
    };
}

function handleQuizz(props){
    let { 
     operatorBusinessName, uuid, userId, courseId, lessonId, lesson
    } = props;

    let formName = getFormName(lesson,formTypes?.quizzwithpoints,uuid);
    let formType = formTypes?.quizzwithpoints;
    let navProps = { operatorBusinessName, formType, formName, courseId, lessonId, userId };

    handleFormNavigation(navProps);
}

function handleHomeWork(props){
    let { 
        operatorBusinessName, uuid, userId, courseId, lessonId, lesson
    } = props;

    let formName = getFormName(lesson, formTypes?.homework, uuid);
    let formType = formTypes?.homework; 
    let navProps = { operatorBusinessName, formType, formName, courseId, lessonId, userId };

    handleFormNavigation(navProps);
}

function handleFurtherStudy(props){
    let { 
        operatorBusinessName, uuid, userId, courseId, lessonId, lesson 
    } = props;

    let formName = getFormName(lesson, formTypes?.furtherstudy, uuid);
    let formType = formTypes.furtherstudy; 
    let navProps = { operatorBusinessName, formType, formName, courseId, lessonId, userId };

    handleFormNavigation(navProps);
}

function handleLessonInsights(props){
    let { 
     operatorBusinessName, uuid, userId, courseId, lessonId, lesson
    } = props;

    let formName = getFormName(lesson, formTypes?.lessoninsights, uuid);
    let formType = formTypes?.lessoninsights;
    let navProps = { operatorBusinessName, formType, formName, courseId, lessonId, userId };

    handleFormNavigation(navProps);
}

function getFormName(currentLesson, type, formUniqueId){
    return `${currentLesson?.title}-${type}_${formUniqueId}`
}

function handleFormNavigation(navProps){
    let {
        operatorBusinessName, formType, formName, courseId, lessonId, userId
    } = navProps;

    navigate(`/${operatorBusinessName}/${formType}/formname/${formName}/courseid/${courseId}/lessonid/${lessonId}/user/${userId}`);
}