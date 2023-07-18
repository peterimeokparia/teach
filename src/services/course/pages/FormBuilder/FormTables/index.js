import { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import { loadFormFieldsByFormFieldId, saveFormFieldNoCallback, saveFormField } from 'services/course/actions/formfields';
import { saveOnlineQuestions } from 'services/course/actions/onlinequestions';
import { formToTableConverter } from 'services/course/pages/FormBuilder/FormTables/helpers';
import StickyHeaderTable from 'services/course/pages/components/StickyHeaderTable';

const FormTables = ( { 
    formName,
    onlineQuestions,
    formFieldAnswers,
    onRowSelectedHandler
}) => {
    const [ column, setColumn ] = useState(null);
    const [ row, setRow ] = useState(null);
    const questions =  onlineQuestions?.filter( question => question?.formName === formName );
    const formAnswers = formFieldAnswers?.filter( ans => ans?.formName === formName );
    let noQuestionsExist = questions?.length === 0;

    useEffect(() => {
        if ( questions && formAnswers ) {
            let tableData = formToTableConverter( questions, formAnswers );

            if ( tableData ){
                setColumn( tableData?.columns  );
                setRow( tableData?.rows );
            }
        }       
    }, [ noQuestionsExist, formAnswers, questions ]);

 return ( <StickyHeaderTable columns={column} rows={row} onRowSelectedHandle={onRowSelectedHandler}/>);
};

const mapState = ( state, ownProps ) => {
    return {
        onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
        formFieldAnswers: Object.values( state?.formFieldAnswers?.formFieldAnswers ),
        formFieldAnswersError: state?.formFieldAnswers?.onSaveError,
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        error: state.lessons.onSaveLessonError
    };
};

export default connect( mapState, { saveFormField, saveFormFieldNoCallback, saveOnlineQuestions, loadFormFieldsByFormFieldId } )(FormTables);
