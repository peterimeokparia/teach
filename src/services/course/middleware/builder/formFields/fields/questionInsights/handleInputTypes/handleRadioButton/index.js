import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { getQuestionInsights } from 'services/course/middleware/builder/formFields/fields/questionInsights';


const handleRadioButton = ( props ) => {
    let { answer, formFieldAnsGroup, store, question, points } = props;

    if ( answer?.inputType === inputType.RadioButton && !answer?.selected ) {
        return undefined;
    }

    if ( answer?.inputType === inputType.RadioButton && answer?.selected ) {
        formFieldAnsGroup = [ {...answer, points } ];
    }
    
    getQuestionInsights(formFieldAnsGroup, props);
};

export default handleRadioButton;