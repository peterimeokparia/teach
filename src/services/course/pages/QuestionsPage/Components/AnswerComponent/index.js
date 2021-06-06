import React from 'react';
import ManageEditors  from '../ManageEditors';
import ReplyComments from 'Services/course/Pages/QuestionsPage/Components/ReplyComments';
import './style.css';

const AnswerComponent = ({ 
  config, 
  questionId, 
  courseId }) => {
  return (
      <>
        <ManageEditors 
            config={ config }
            questionId={ questionId }
            courseId={ courseId }
          >
            {
                ( answer ) => (
                  <ReplyComments 
                      questionId={ questionId}
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