import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { addMissedAnswers } from "services/course/actions/missedanswers";
import { navigate } from '@reach/router';
import MyEditorTest2 from 'services/course/editor/MyEditorTest2';
   
const MissedQuestionsComponent = ( { 
  display,
  setMissedQuestions,
  questionProps,
  addMissedAnswers,
  onlineQuestions, 
  formFields,
  formFieldAnswers, 
  missedQuestions,
  answerFormType,
  answerFormName,
  answerFormUuId,
  answerFormUserId,
  operatorBusinessName
} ) => {
  useEffect( () => {
    let missedQuestionProps = { ...questionProps, onlineQuestions, formFields, formFieldAnswers, operatorBusinessName };

    addMissedAnswers( missedQuestionProps );
  }, [ addMissedAnswers, questionProps, onlineQuestions, formFields, formFieldAnswers, operatorBusinessName ]);

  let noMissedQuestions = missedQuestions?.length === 0;

  useEffect(() => {
    if ( missedQuestions?.length > 0 ) {
      setMissedQuestions( missedQuestions );
    }
  }, [ noMissedQuestions, setMissedQuestions, missedQuestions ]);
        
  const handleSelectedQuestion = ( question ) => {
    if ( ! question ) return;
    // I broke this...?
    navigate(`/${operatorBusinessName}/formBuilder/${answerFormType}/${answerFormName}/${question?.courseId}/${answerFormUuId}/${answerFormUserId}/Taking/000/#${question?._id}`);
    //http://localhost:3000/undefined/formBuilder/quizzwithpoints/Bonds-quizz_94c32d6d-0bff-40c3-be94-03d18bd445f7/613ac665f6ca0ce27d863330/d29dd2f7-f285-4b27-8fc4-0ac569f187a2/62908a073b7d8b2455d1d7cb/Taking/000/#628c566b4ea5f18296124ef3
  };

return(
    <>
    {
      // missedQuestions?.assignedOutcomes.map => Met / Unmet? = Lesson Plan = ToDo => Videos, H/w, Schedule session, Verify that unmet outcome has been satisfied e.g student now grasps concepts etc - in progress
    }
    {
    <div className="missed-questions">
    { missedQuestions?.length > 0 && display && <div> { "Missed Questions." } </div> &&
      [ ...new Set( missedQuestions ) ]?.map(question => (
        <div>
          <div 
            className="explanation-content" 
            onClick={() => handleSelectedQuestion( question )} 
          > 
          {
            `OutcomeId: ${question?.outcomeId}`
          }
            {
              <MyEditorTest2  
                element={ question } 
                content={ question?.markDownContent } 
                readOnly={ true } // form builder status is manage
                showMenuButtons={ false  } 
             />
            }
        </div>
        </div>
      ))
    }
    </div>
    }
    </>
    );
};

const mapDispatch = { addMissedAnswers };
  
const mapState = ( state, ownProps ) => { 
  return {
    onlineQuestions: Object.values(state?.onlineQuestions?.onlineQuestions),
    formFields: Object.values( state?.formFields?.formFields ).filter( field => field?.formType === ownProps?.formType && 
      field?.formName === ownProps?.formName ),
    formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ).filter( field => field?.formType === ownProps?.formType && 
      field?.formName === ownProps?.formName ),
    missedQuestions: state?.missedQuestions?.missedQuestions,
    answerFormType:state?.missedQuestions?.answerFormType,
    answerFormName: state?.missedQuestions?.answerFormName,
    answerFormUuId: state?.missedQuestions?.answerFormUuId,
    answerFormUserId: state?.missedQuestions?.answerFormUserId
  };
};

export default connect( mapState, mapDispatch )(MissedQuestionsComponent);
