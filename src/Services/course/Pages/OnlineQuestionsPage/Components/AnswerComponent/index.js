import ManageEditors  from '../ManageEditors';
import ReplyComments from 'services/course/pages/OnlineQuestionsPage/components/ReplyComments';

import './style.css';

const AnswerComponent = ({ 
  question, 
  courseId }) => {
  return (
      <>
        <ManageEditors 
            question={ question }
            courseId={ courseId }
          >
            {
              ( answer ) => (
                <ReplyComments 
                    question={ question }
                    courseId={ courseId }
                    answer={ answer }
                />
              )
            }          
        </ManageEditors>
      </>
  );
};

export default AnswerComponent;