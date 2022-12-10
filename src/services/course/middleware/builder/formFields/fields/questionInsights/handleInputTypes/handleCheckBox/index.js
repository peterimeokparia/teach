import { loadOnlineQuestionsByQuestionId } from 'services/course/actions/onlinequestions';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { handleQuestionInsightPoints, handleAddingNewQuestionInsight, handleSavingQuestionInsights } from 'services/course/middleware/builder/formFields/fields/questionInsights';
import { updateCollection } from 'services/course/middleware/builder/formFields/fields/questionInsights/handleInputTypes';
import { getQuestionInsights } from 'services/course/middleware/builder/formFields/fields/questionInsights';


const handleCheckBox = ( props ) => {
    let { answer, formFieldAnsGroup, store, question, points } = props;

    if ( answer?.inputType !== inputType.CheckBox ) return undefined;

    if ( answer && formFieldAnsGroup.length === 0  ) {
        formFieldAnsGroup = [ { ...answer, points } ];
    }
        formFieldAnsGroup = updateCollection( answer, formFieldAnsGroup, points );

        getQuestionInsights( formFieldAnsGroup, props );
};

export default handleCheckBox;