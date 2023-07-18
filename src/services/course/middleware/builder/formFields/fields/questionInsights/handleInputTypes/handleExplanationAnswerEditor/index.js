import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { getQuestionInsights } from 'services/course/middleware/builder/formFields/fields/questionInsights';

const handleExplanationAnswerEditor = ( props ) => {
    let { answer, formFieldAnsGroup, points } = props;

    if ( answer?.inputType !== inputType.ExplanationAnswerEditor )  return undefined;
    
        formFieldAnsGroup = [ { ...answer, points } ];

        getQuestionInsights( formFieldAnsGroup, props );
};

export default handleExplanationAnswerEditor;