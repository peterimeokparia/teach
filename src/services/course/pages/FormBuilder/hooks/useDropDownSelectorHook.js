import { useState  } from "react";
import { useDispatch } from "react-redux";
import { getPreviouslySelectedDropDownAnswer } from "services/course/pages/FormBuilder/FormBuilderStepWizard/SelectExistingFormBuilderComponent/FormFields/component/DropDown/helpers";
import { loadFormFieldAnswersByFormFieldId } from 'services/course/actions/formfieldanswers';
import { loadFormFieldsByFormFieldId, saveFormField } from 'services/course/actions/formfields';
import { generateUuid } from 'services/course/pages/Users/helpers';

function useDropDownSelectorHook( props ) {
  let {
    handleFormFieldAnswers,
    studentAnswerByQuestionId,
    formFieldElement,
    currentUser
  } = props;

  const [ inputValue,  setInputValue ] = useState( null );
  const [ mathModalOpen, setMathModalOpen ] = useState(false);
  const [ editorState,  setEditorState ] = useState(null);
  const dispatch = useDispatch();

  const handleInputValue = ( selectedOption ) => {
    setInputValue( selectedOption );
    handleDropDownSelection( selectedOption );
  };

  const addOptionValue = () => {    
    try {
      const uuid = generateUuid();
      let dropDownSelectorValues = [ ...formFieldElement?.dropDownOptions, { markDownContent: editorState, id: uuid } ];

      dispatch( saveFormField({ ...formFieldElement, dropDownOptions: dropDownSelectorValues }) );
      dispatch( loadFormFieldsByFormFieldId( formFieldElement?._id) );
    } catch (error) {
      alert('error')
      alert(JSON.stringify( error ));
    }
  };

  const deleteOptionValue = () => {
    if ( inputValue ) {
      let dropDownSelectorValues = formFieldElement?.dropDownOptions?.filter( option => option?.id !== inputValue?.id );

      dispatch( saveFormField({ ...formFieldElement, dropDownOptions: dropDownSelectorValues }) );
      dispatch( loadFormFieldsByFormFieldId( formFieldElement?._id) );
    } 
  };

  const handleDropDownSelection = ( value ) => {
    const prevPoints = getPreviouslySelectedDropDownAnswer( studentAnswerByQuestionId, formFieldElement?.questionId, formFieldElement?._id ); 
    if ( !currentUser?._id ) return;
      let points = ( !formFieldElement?.answerKey || value?.id !== formFieldElement?.answerKey ) ? 0 : formFieldElement['points'];

      setInputValue( value  );
      points = prevPoints > 0 ? prevPoints : points;
      handleFormFieldAnswers( formFieldElement, value?.id, points );
      dispatch( loadFormFieldAnswersByFormFieldId( studentAnswerByQuestionId?._id) );
    };

 function setEditorStateTest( markDownContent ){
  setEditorState( markDownContent );
 }

return {
  inputValue,  
  mathModalOpen,  
  setEditorStateTest,
  setMathModalOpen,
  setInputValue,
  handleInputValue,
  handleDropDownSelection,
  addOptionValue,
  deleteOptionValue
}; };

export default useDropDownSelectorHook;