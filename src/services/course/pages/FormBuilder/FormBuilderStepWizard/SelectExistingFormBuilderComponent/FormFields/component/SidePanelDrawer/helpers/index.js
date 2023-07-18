import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import './style.css';

export function getFieldInputStyle( inputtype ){
  if ( inputtype === inputType.CheckBox ) 
  return { unselected: 'field-input-checkbox', selected: 'field-input-checkbox-selected'  };
  
  return { unselected: 'field-input', selected: 'field-input-selected'  }
}

