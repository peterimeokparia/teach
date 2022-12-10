import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { loadFormFieldsByFormFieldId } from 'services/course/actions/formfields';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { saveDraggableIconStyle } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';
import { getFieldInputStyle } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer/helpers';
import SaveIcon from '@material-ui/icons/Save';
import Swal from 'sweetalert2';

function renderInputSidePanelFields( props ){
    let {
        fieldRef,
        previewMode,
        formFieldElement,
        openDrawer,
        setOpenDrawer,
        selectedQuestion,
        inputValue,
        setInputValue,
        handleChangedValue,
        saveFormField,
    } = props;

    return <> 
        {( previewMode && ![ inputType?.ExplanationAnswerEditor, inputType?.DraggableListItem ].includes( formFieldElement?.inputType )  ) && 
            <span className={ ( previewMode && formFieldElement.selected ) ? getFieldInputStyle(formFieldElement.inputType)?.unselected : getFieldInputStyle(formFieldElement.inputType)?.selected}> 
                <span onClick={() => setOpenDrawer( !openDrawer )}>
                <input
                    ref={ formFieldElement?.questionId === selectedQuestion?._id  ? fieldRef : null }
                    type={"text"}
                    value={inputValue}
                    onChange={e => handleChangedValue( e.target.value, setInputValue, { ...formFieldElement, inputValue: e.target.value }, saveFormField )}
                    placeholder={formFieldElement?.inputValue} 
                />  
                </span>  
            </span>
        }
    </>;
}

export default renderInputSidePanelFields;