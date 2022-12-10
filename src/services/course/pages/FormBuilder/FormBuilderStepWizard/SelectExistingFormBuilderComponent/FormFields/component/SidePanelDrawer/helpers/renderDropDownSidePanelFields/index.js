import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { loadFormFieldsByFormFieldId } from 'services/course/actions/formfields';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { saveDraggableIconStyle } from 'services/course/pages/Lessons/LessonPlan/inlineStyles.js';
import { getFieldInputStyle } from 'services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/SidePanelDrawer/helpers';
import SaveIcon from '@material-ui/icons/Save';
import Swal from 'sweetalert2';

function renderDropDownSidePanelFields( props ){
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
      {( previewMode && formFieldElement?.inputType && inputType.DropDown) && 
          <span className={ ( previewMode && formFieldElement.selected ) ? getFieldInputStyle(formFieldElement.inputType)?.unselected : getFieldInputStyle(formFieldElement.inputType)?.selected}> 
              <span onClick={() => setOpenDrawer( !openDrawer )} />
          </span>
      }
  </>;
}

export default renderDropDownSidePanelFields;