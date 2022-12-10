import { handleAddingOutcomeInsight } from 'services/course/middleware/outcomeInsight/helpers';
import { handleAddingQuestionInsight } from 'services/course/middleware/questionInsight/helpers';
import { unAnsweredQuestions } from 'services/course/middleware/builder/formFields/fields/questionInsights/unAnsweredQuestions';
import { buildCourseInsights } from 'services/course/middleware/courseInsights/helpers';


const buildInsights = ( store, form ) => {
    
    let unAnsweredQuestionsCollection = unAnsweredQuestions( store, form );

    if ( unAnsweredQuestionsCollection?.length > 0 ) {
        
        setTimeout(handleInsights, 20000, store, form); //remove timeout

    } else {

        handleInsights( store, form );
    }
};

function handleInsights( store, form ) {
    handleAddingQuestionInsight( store, form );
    handleAddingOutcomeInsight( store, form );
    setTimeout(buildCourseInsights, 20000, store, form);
    // buildCourseInsights( store, form );
}

export default buildInsights;