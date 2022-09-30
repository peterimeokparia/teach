import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleContentChanged, loadOnlineQuestions } from 'services/course/actions/onlinequestions';

function useLoadQuestionsOnUpdatedQuestionContentHook( contentUpdated ){
    const dispatch = useDispatch();
   
    useEffect(() => {
        if ( contentUpdated ) {
            dispatch( loadOnlineQuestions() );
            dispatch( toggleContentChanged() );
        }
    }, [ contentUpdated ]);                   
};

export default useLoadQuestionsOnUpdatedQuestionContentHook;

