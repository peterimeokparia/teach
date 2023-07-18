import NavigationMenu from 'services/course/pages/FormStepWizards/NavigationMenu';

const FormQuestionsStep1 = ({ 
    operatorBusinessName, 
    userId, 
    formType, 
    formName, 
    formId, 
    courseId, 
    lessonId,  
    eventId
 }) => {
    return (    
        <div>   
            <NavigationMenu>
                {
                   <div>{'...placeholder'}</div>
                }
            </NavigationMenu>
        </div>
    ); 
};

export default FormQuestionsStep1;