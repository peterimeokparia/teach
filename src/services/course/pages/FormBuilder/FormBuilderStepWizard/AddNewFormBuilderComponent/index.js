import { generateUuid } from 'services/course/pages/Users/helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import NewFormBuilderPage from 'services/course/pages/FormBuilder/FormBuilderStepWizard/NewFormBuilderPage';

const AddNewFormBuilderComponent = ({props}) => {
    let formUuId = generateUuid();   
    let dateTime = Date.now();
    let { operatorBusinessName, currentUser, formType, formName, formId, courseId, lessonId, eventId, outcomeId } =props;
    
    let newBuilderProps = {
      operatorBusinessName,formType,formName,courseId,lessonId,formId,formUuId,createDateTime: dateTime, outcomeId,
      takingDateTime: dateTime, createdBy: currentUser?._id, userId: currentUser?._id, status: elementMeta.status.Pending, state: elementMeta.state.Manage, eventId
    };

return (
    <div className="NewCourse">
        { <NewFormBuilderPage formBuilderProps={newBuilderProps}/> }
    </div>
); };

 export default AddNewFormBuilderComponent;