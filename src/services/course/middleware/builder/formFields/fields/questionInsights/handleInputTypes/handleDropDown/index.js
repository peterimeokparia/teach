import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { getQuestionInsights } from 'services/course/middleware/builder/formFields/fields/questionInsights';


const handleDropDown = ( props ) => {
    let { answer, formFieldAnsGroup, store, question } = props;

    if ( answer?.inputType !== inputType.DropDown ) return undefined;

    let points = ( answer?.answer === answer?.answerKey ) ? answer?.points : 0

    formFieldAnsGroup = [ { ...answer, points } ];

    getQuestionInsights( formFieldAnsGroup, props );
};

export default handleDropDown;