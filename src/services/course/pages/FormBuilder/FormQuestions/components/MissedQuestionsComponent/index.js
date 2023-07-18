import React from 'react';
import { connect } from 'react-redux';
import { setSelectedOnlineQuestion } from 'services/course/actions/onlinequestions';
import MyEditorTest3 from 'services/course/editor/MyEditorTest3';
import './style.css';
   
const MissedQuestionsComponent = ( { 
  display,
  missedQuestions,
  mainHeaderOutcomeTitle,
  setSelectedOnlineQuestion,
} ) => {

  if ( !missedQuestions?.length || missedQuestions?.length === 0 ) return null;
      
  const handleSelectedQuestion = ( question ) => {
    if ( ! question ) return;
    setSelectedOnlineQuestion( question );
  };

return(
  <div className="missed-questions-list">
    {
      // missedQuestions?.assignedOutcomes.map => Met / Unmet? = Lesson Plan = ToDo => Videos, H/w, Schedule session, Verify that unmet outcome has been satisfied e.g student now grasps concepts etc - in progress
    }
    { missedQuestions?.length > 0 && display && <div> { "Missed Questions." } </div> &&
      [ ...new Set( missedQuestions ) ]?.map(question => (
        <div>
          <div onClick={() => handleSelectedQuestion( question )}> 
          {
            `Missed Questions.`
          }
          { <div> 
            {/* {'delete'} */}
              {mainHeaderOutcomeTitle}
              {/* {`OutcomeId: ${question?.outcomeId} `}  */}
            </div> 
          }
          {
            <div className="missed-questions-item">
            <MyEditorTest3  
              element={ question } 
              content={ question?.markDownContent } 
              readOnly={ true } // form builder status is manage
              showMenuButtons={ false  } 
            />
            </div>
          }
        </div>
        </div>
      ))
    }
    </div>
    );
};

export default connect(null, { setSelectedOnlineQuestion })(MissedQuestionsComponent);
