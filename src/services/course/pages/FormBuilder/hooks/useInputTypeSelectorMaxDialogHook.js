import { 
useState } from 'react';

import {
inputType } from 'services/course/pages/QuestionsPage/helpers';
      
import {
v4 as uuidv4 } from 'uuid';

function useInputTypeSelectorMaxDialogHook( props ) {

  let { 
    addNewFormInputField,
    addNewQuestion,
    selectedQuestion,
    setSelectedQuestion,
    collection,
  } =  props;

  const [ contentChanged, setContentChanged ] = useState( undefined );
  const [ isMaxDialogOpen, setIsMaxDialogOpen ] = useState(false);
    
function addFormField( typeOfInput ){
  selectInputAction( typeOfInput )
  setContentChanged( true );
}

  let modalProps = {
    isOpen: isMaxDialogOpen, 
    collection,
    dialogTitle:'Select input type',
    InputLabel: 'type',
    handleClose: () => toggleFormFieldSelector( selectedQuestion ), 
    selectEventChangeHandler: addFormField,
  }

function selectInputAction( typeOfInput ){
  const uuid = uuidv4();
  
    switch ( typeOfInput ) {
      case inputType.MainBodyQuestion: 
      case inputType.MainBodyTableColumnQuestion:
      case inputType.MathScienceQuestion:   

      case inputType.MathTextArea:
      case inputType.Latex:
        addNewQuestion( typeOfInput );
        break; 
      case inputType.Text: 
      case inputType.TextLabel: 
      case inputType.RadioButton: 
      case inputType.DropDown:
      case inputType.Explanation: 
      case inputType.CheckBox:
      case inputType.Date:
      case inputType.Time: 
      case inputType.DateTime: 
      case inputType.Toggle:
      case inputType.Number:
      case inputType.NumberPosition:
      case inputType.NumberPercentage:
      case inputType.DataObjectSelector:
      case inputType.FileUpload:  
      case inputType.MathScience:
      case inputType.LatexField:
      case inputType.MathScienceRadioButton:

      case inputType.MathTextArea:
      case inputType.Latex:
        addNewFormInputField( typeOfInput, uuid);
        break; 
      default:
        break;
    }
}

function toggleFormFieldSelector( question ) {

  if ( isMaxDialogOpen ){
   
    setIsMaxDialogOpen( false );
  } else {
    setIsMaxDialogOpen( true );
  }
  
  if ( question ) {
    setSelectedQuestion( question );
  }
};

return {
    modalProps,
    selectedQuestion,
    contentChanged,
    setContentChanged,  
    addFormField,
    setIsMaxDialogOpen,
    toggleFormFieldSelector,
}; };

export default useInputTypeSelectorMaxDialogHook;