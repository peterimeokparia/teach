import { Router, Redirect } from '@reach/router';
import FormQuestionsStep1 from 'services/course/pages/FormStepWizards/FormQuestionsStep1';
import FormQuestionsStep2 from 'services/course/pages/FormStepWizards/FormQuestionsStep2';
import FormQuestionsStep3 from 'services/course/pages/FormStepWizards/FormQuestionsStep3';

//<FormBuilder path="/:operatorBusinessName/:formType/formname/:formName/courseid/:courseId/lessonid/:lessonId/user/:userId/stepone"/> 
export const FormBuilderQuestionsWizard = () => {
 return <Router>
       <Redirect noThrow from="/" to="/main" />
        <FormQuestionsStep1 path="/teach/formquestionsstep1" />
        <FormQuestionsStep2 path="/teach/formquestionsstep2" />
        <FormQuestionsStep3 path="/teach/formquestionsstep3"/>
    </Router>;
};
    
