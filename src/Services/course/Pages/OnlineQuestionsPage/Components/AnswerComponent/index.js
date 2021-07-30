import ManageEditors  from '../ManageEditors';
import ReplyComments from 'Services/course/Pages/OnlineQuestionsPage/Components/ReplyComments';

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