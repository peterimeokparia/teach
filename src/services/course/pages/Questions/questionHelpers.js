import {
role } from '../../../../helpers/pageHelpers';


export const labelValue = ( labelType, index ) => {

    let alphabet = [ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j" ];  
    let roman = [ "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x" ];
    let number = [ "1", "2", "3", "4", "5", "6", "7", "8", "9", "10" ];
    let selectedValue = null;

     try {
         
        switch ( labelType ) {

            case "roman":
            selectedValue = roman[ index-1 ];    
                break;

            case "numbers": 
            selectedValue = number[ index-1 ];    
                break;    

            default:
            selectedValue = alphabet[ index-1 ];
                break;
        }

    return selectedValue;    

     } catch (error) {

        console.log( error );
         
     }

}

export const editorContentType = {
    Explanation: "Explanation", 
    MultipleChoice: "MultipleChoice",
    Question: "Question",
    VideoPlayer: "VideoPlayer"  
}

export const points = {
    PerQuestion: "PerQuestion",
    Equally: "Equally",
    equalPointsDistribution: "equalPointsDistribution",
    pointsPerQuestion: "pointsPerQuestion"
}

export const elementMeta = {
   name: "name",
   _id : "_id",
   Explanation: "Explanation",
   multipleChoicelabel: "multipleChoicelabel",
   multipleChoicelabelAnswer: "multipleChoicelabelAnswer",
   multipleChoice : "multipleChoice",
   radio: "radio",
   value: "value",
   name: "name",
   multipleChoiceAnswer : "multipleChoiceAnswer",
   multipleChoicelabel : "multipleChoicelabel",
   multipleChoicelabelAnswer : "multipleChoicelabelAnswer",
   inputTypeDropDownSelectedValue: "inputTypeDropDownSelectedValue",
   labelTypeDropDownSelectedValue : "labelTypeDropDownSelectedValue",
   multipleChoiceAnswerValue : "multipleChoiceAnswerValue",
   multipleChoiceAnswerKeyValue: "multipleChoiceAnswerKeyValue",
   multipleChoiceAnswerExplanationKeyValue: "multipleChoiceAnswerExplanationKeyValue",
   explanationAnswerValue: "explanationAnswerValue",
   explanationAnswerKey: "explanationAnswerKey",
   multipleChoiceLabelValue: "multipleChoiceLabelValue",
   multipleChoiceValue: "multipleChoiceValue",
   questionAnsweredOnDateTime: "questionAnsweredOnDateTime",
   formInputAnswers: "formInputAnswers",
   InputFieldCreator: "InputFieldCreator",
   markDownEditorFormInputFields: "markDownEditorFormInputFields",
   multipleChoiceQuestionAnswerKey: "multipleChoiceQuestionAnswerKey",
   multipleChoiceQuestionAnswerKeyInputValue: "multipleChoiceQuestionAnswerKeyInputValue",
   multipleChoiceQuestionStudentAnswer: "multipleChoiceQuestionStudentAnswer",
   multipleChoiceQuestionStudentAnswerInputValue: "multipleChoiceQuestionStudentAnswerInputValue",
   multipleChoiceQuestionExplanationAnswer: "multipleChoiceQuestionExplanationAnswer",
   explanationQuestionAnswerKey: "explanationQuestionAnswerKey",
   explanationQuestionAnswer: "explanationQuestionAnswer",
   markDownContent: "markDownContent",
   questionPoints: "questionPoints",
   equalPointsDistribution: "equalPointsDistribution",
   pointsPerQuestion: "pointsPerQuestion",
   pointsReceived: "pointsReceived",
   totalPointsReceived: "totalPointsReceived",
};

export const inputType = {
    CheckBox: "checkbox",
    RadioButton: "radiobutton",
    Text: "text",
    TextArea: "textarea",
    Video: "video",
    Email: "email",
    Number: "number",
    Phone: "phone", 
    Date: "date",
    DateTime: "datetime"
}


export const labelType = {
    Alphabet: "alphabet",
    RomanNumerals: "roman",
    Numbers: "numbers"
}

export const dropDownOptions = {
    labelOptions:  [{_id: "Label Type",  name:  "Label Type" }, {_id: labelType.Alphabet,  name: labelType.Alphabet}, {_id: labelType.Numbers,  name: labelType.Numbers}, {_id: labelType.RomanNumerals,  name: labelType.RomanNumerals } ],
    inputOptions: [ {_id: "Input Type",  name:  "Input Type" }, { _id: inputType.Text,  name: inputType.Text }, { _id: inputType.TextArea,  name: inputType.TextArea }, { _id: inputType.Video,  name: inputType.Video } ],
}


export function handleSettingMultipleChoiceValue( field, event, fieldNameOne, fieldNameTwo, updateMarkDownEditor ){
  updateMarkDownEditor( { data: event.target.value, fieldName: fieldNameOne } ); 
  updateMarkDownEditor( { data: field[ elementMeta.value ], fieldName: fieldNameTwo } ); 
}


export function setMultipleChoiceLabelValue ( fields,  label, elementId, currentQuestionNumber, currentMarkDownEditornumber ) {
  return handleUpdatingMultipleChoiceSelection( fields, elementMeta.multipleChoiceLabelValue, label, elementId, currentQuestionNumber, currentMarkDownEditornumber ); 
}
  
  
  export function setMultipleChoiceValue ( fields, label, elementId, currentQuestionNumber, currentMarkDownEditornumber ) {
    return handleUpdatingMultipleChoiceSelection( fields, elementMeta.multipleChoiceValue, label, elementId, currentQuestionNumber, currentMarkDownEditornumber );      
  }


  export function handleUpdatingMultipleChoiceSelection( fields, fieldDescription,  labeltype, elementId, currentQuestionNumber, currentMarkDownEditornumber ){

    let existingFieldUpdate = fields.find(obj => obj?.questionNumber === currentQuestionNumber && 
      obj?.markDownEditorNumber === currentMarkDownEditornumber && 
          obj?.id === elementId);
  
    if ( fields.length > 0  && existingFieldUpdate ) {
          existingFieldUpdate[ fieldDescription ] = labelValue( labeltype, elementId );
    } 
      
    return labelValue( labeltype, elementId ) ;
  } 



  export function calculatePointsReceived( answerKey, studentsAnswer, questionPoints ) {

    let points = 0;

    if ( answerKey ) {
       return points = ( answerKey === studentsAnswer ) ? parseInt( questionPoints, 10 ) : 0;
    }
    return 0;
 }



 export function handleMarkDownContentChange ( fields, editor, id, userrole, updateMarkDownEditor, currentQuestionNumber, currentMarkDownEditornumber ) {
  
    let inputField = fields.find(obj => obj?.name === (`editor${id}`) && obj.id === id  && 
           obj?.questionNumber === currentQuestionNumber && obj?.markDownEditorNumber === currentMarkDownEditornumber );
  
    if ( userrole === role.Student ) {

      if ( inputField ) {
        inputField[ elementMeta.explanationAnswerValue ] = JSON.stringify(editor.emitSerializedOutput() );
        updateMarkDownEditor( { data: JSON.stringify(editor.emitSerializedOutput() ), fieldName: elementMeta.explanationQuestionAnswer } );
        fields.find(obj => obj?.questionNumber === currentQuestionNumber && obj?.markDownEditorNumber === currentMarkDownEditornumber )[ elementMeta.questionAnsweredOnDateTime ] = Date.now();  
      }
        
    }
  }


  export function handleMultiFieldFormEvents( documentId, eventType, fields, updateMarkDownEditor, markDownEditorFieldName ) {
    documentId.addEventListener(eventType, e => {
       updateMarkDownEditorOnEventNotification( fields, markDownEditorFieldName, updateMarkDownEditor );
    });
 }
 
 
 function updateMarkDownEditorOnEventNotification( fields, markDownEditorFieldName,  updateMarkDownEditor) {
    if ( fields.length > 0 && fields ){
      updateMarkDownEditor( { data: fields, fieldName: markDownEditorFieldName } ); 
    }
 }


export function contentType ( elementType ){

  return {
      isMultipleChoiceContentType: (elementType === editorContentType.MultipleChoice),
      isExplanationContentType: (elementType === editorContentType.Explanation),
      isVideoContentType: (elementType === editorContentType.VideoPlayer),
      isQuestionContentType: (elementType === editorContentType.Question),
  }

}