import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOnlineQuestion } from 'services/course/actions/onlinequestions';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';      
import { v4 as uuidv4 } from 'uuid';
  
function useInputTypeSelectorMaxDialogHook( props ) {
  let { addNewFormInputField, addNewQuestion, isMaxDialogOpen, setIsMaxDialogOpen } =  props;

  const [ contentChanged, setContentChanged ] = useState( undefined );
  const selectedOnlineQuestion = useSelector( state => state.onlineQuestions.selectedOnlineQuestion );
  const dispatch = useDispatch();

function addFormField( typeOfInput ){
  selectInputAction( typeOfInput );
  setContentChanged( true );
}

  let modalProps = {
    isOpen: isMaxDialogOpen, dialogTitle:'Select input type', InputLabel: 'type',
    handleClose: () => toggleFormFieldSelector( selectedOnlineQuestion ), selectEventChangeHandler: addFormField,
  };

function selectInputAction( typeOfInput ){
  const uuid = uuidv4();
  
    switch ( typeOfInput ) {
      case inputType.CopyExistingQuestion: 
      case inputType.MainBodyQuestion: 
      case inputType.MainBodyTableColumnQuestion:
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
      case inputType.ExplanationAnswerEditor:
      case inputType.DraggableListItem:
        addNewFormInputField( typeOfInput, uuid );
        break; 
      default:
       console.log(`Problem with finding case for ${typeOfInput}`)
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
    dispatch( setSelectedOnlineQuestion( question ) );
  }
};

return {
    modalProps,
    contentChanged,
    setContentChanged,  
    addFormField,
    setIsMaxDialogOpen,
    toggleFormFieldSelector,
}; };

export default useInputTypeSelectorMaxDialogHook;