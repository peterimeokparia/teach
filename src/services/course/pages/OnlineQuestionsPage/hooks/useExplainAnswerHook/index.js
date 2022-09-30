import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadExplainerOnlineQuestionAnswers } from 'services/course/actions/onlinequestionexplainanswer';

function useExplainAnswerHook(){
    const dispatch = useDispatch();

    useEffect( () => { 
      dispatch( loadExplainerOnlineQuestionAnswers() ); 
    }, []);
};

export default useExplainAnswerHook;