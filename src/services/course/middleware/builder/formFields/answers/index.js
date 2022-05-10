import { 
saveFormFieldAnswer } from "services/course/actions/formfieldanswers";

export function addNewFormFieldPlusAnswer( store, inputFieldData ){
  store.dispatch( saveFormFieldAnswer( inputFieldData ) );
};
