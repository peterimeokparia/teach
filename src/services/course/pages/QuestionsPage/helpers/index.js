import {
role } from 'services/course/helpers/PageHelpers';

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
    throw Error(`  ${error}`);
  };
};

export const editorContentType = {
  Explanation: "Explanation", 
  MultipleChoice: "MultipleChoice",
  Question: "Question",
  VideoPlayer: "VideoPlayer",
  Comments: "Comments"  
};

export const points = {
  PerQuestion: "PerQuestion",
  Equally: "Equally",
  equalPointsDistribution: "equalPointsDistribution",
  pointsPerQuestion: "pointsPerQuestion"
};

export const elementMeta = {
  name: "name",
  _id : "_id",
  Explanation: "Explanation",
  multipleChoicelabel: "multipleChoicelabel",
  multipleChoicelabelAnswer: "multipleChoicelabelAnswer",
  multipleChoice : "multipleChoice",
  radio: "radio",
  value: "value",
  multipleChoiceAnswer : "multipleChoiceAnswer",
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
  explanationAnswerCollection: "explanationAnswerCollection",
  commentsCollection: 'commentsCollection',
  questionPushNotificationSubscribers: 'questionPushNotificationSubscribers',
  questionEmailNotificationSubscribers: 'questionEmailNotificationSubscribers',
  savedQuestions: 'savedQuestions', 
  status: { Editing: 'editing', NotEditing: 'notediting', InProgress:'InProgress', Submitted:'Submitted', Pending:'Pending', Published:'Published' },
  state: { Manage: 'Manage', Taking: 'Taking', Submitted: 'Submitted' }
};

export const inputType = {
  CheckBox: "checkbox",
  RadioButton: "radio",
  //RadioButton: "radiobutton",
  TextLabel: "textlabel",
  Text: "text",
  TextArea: "textarea",
  MathTextArea: "mathtextarea",
  Video: "video",
  Email: "email",
  Number: "number",
  Phone: "phone", 
  Date: "date",
  Time: "time",
  DateTime: "datetime",
  Toggle: "toggle",
  DropDown: "dropdown",
  DataObjectSelector: "dataobjectselector",
  Explanation: "explanation",
  MathScience: "mathscience",
  Latex: "latex",
  LatexField: "latexfield",
  MainBodyQuestion: "mainbodyquestion",
  MathScienceQuestion: "mathsciencequestion",
  MainBodyHeader: "mainbodyheader",
  MainBodyTableColumnQuestion: "mainbodytablecolumnquestion",
  Number: "number",
  NumberPosition: "numberposition",
  NumberPercentage: "numberpercentage",
  FileUpload: "fileupload",
  MathScienceRadioButton: "mathscienceradiobutton"
};

export const labelType = {
  Alphabet: "alphabet",
  RomanNumerals: "roman",
  Numbers: "numbers"
};

export const dropDownOptions = {
  labelOptions:  [{_id: "Label Type",  name:  "Label Type" }, {_id: labelType.Alphabet,  name: labelType.Alphabet}, {_id: labelType.Numbers,  name: labelType.Numbers}, {_id: labelType.RomanNumerals,  name: labelType.RomanNumerals } ],
  inputOptions: [ {_id: "Input Type",  name:  "Input Type" }, { _id: inputType.Text,  name: inputType.Text }, { _id: inputType.TextArea,  name: inputType.TextArea }, { _id: inputType.Video,  name: inputType.Video } ],
};

export function handleSettingMultipleChoiceValue( field, event, fieldNameOne, fieldNameTwo, updateMarkDownEditor ){
  updateMarkDownEditor( { data: event.target.value, fieldName: fieldNameOne } ); 
  updateMarkDownEditor( { data: field[ elementMeta.value ], fieldName: fieldNameTwo } ); 
};

export function setMultipleChoiceLabelValue ( fields,  label, elementId, currentQuestionNumber, currentMarkDownEditornumber ) {
  return handleUpdatingMultipleChoiceSelection( fields, elementMeta.multipleChoiceLabelValue, label, elementId, currentQuestionNumber, currentMarkDownEditornumber ); 
};

export function setMultipleChoiceValue ( fields, label, elementId, currentQuestionNumber, currentMarkDownEditornumber ) {
  return handleUpdatingMultipleChoiceSelection( fields, elementMeta.multipleChoiceValue, label, elementId, currentQuestionNumber, currentMarkDownEditornumber );      
};

export function handleUpdatingMultipleChoiceSelection( fields, fieldDescription,  labeltype, elementId, currentQuestionNumber, currentMarkDownEditornumber ){
  let existingFieldUpdate = fields.find(obj => obj?.questionNumber === currentQuestionNumber && 
    obj?.markDownEditorNumber === currentMarkDownEditornumber &&  obj?.id === elementId);

  if ( fields.length > 0  && existingFieldUpdate ) {
        existingFieldUpdate[ fieldDescription ] = labelValue( labeltype, elementId );
  } 
  return labelValue( labeltype, elementId ) ;
}; 

export function calculatePointsReceived( answerKey, studentsAnswer, questionPoints ) {
  let points = 0;
  
  if ( answerKey ) {
      points = ( answerKey === studentsAnswer ) ? parseInt( questionPoints, 10 ) : 0;  
  }
  return points;
};

export function handleMarkDownContentChange ( fields, editor, id, userrole, updateMarkDownEditor, currentQuestionNumber, currentMarkDownEditornumber ) {
    let inputField = fields.find(obj => obj?.name === (`editor${id}`) && obj.id === id  && 
           obj?.questionNumber === currentQuestionNumber && obj?.markDownEditorNumber === currentMarkDownEditornumber );
  
    if ( userrole === role.Student ) {
      if ( inputField ) {
        inputField[ elementMeta.explanationAnswerValue ] = JSON.stringify(editor.emitSerializedOutput() );
        updateMarkDownEditor( { data: JSON.stringify(editor.emitSerializedOutput() ), fieldName: elementMeta.explanationQuestionAnswer } );
        fields.find(obj => obj?.questionNumber === currentQuestionNumber && obj?.markDownEditorNumber === currentMarkDownEditornumber )[ elementMeta.questionAnsweredOnDateTime ] = Date.now();  
      }
    };
};

export function handleMultiFieldFormEvents( documentId, eventType, fields, updateMarkDownEditor, markDownEditorFieldName ) {
    documentId.addEventListener(eventType, e => {
       updateMarkDownEditorOnEventNotification( fields, markDownEditorFieldName, updateMarkDownEditor );
    });
};

export function contentType ( elementType ){
  return {
      isMultipleChoiceContentType: (elementType === editorContentType.MultipleChoice),
      isExplanationContentType: (elementType === editorContentType.Explanation),
      isVideoContentType: (elementType === editorContentType.VideoPlayer),
      isQuestionContentType: (elementType === editorContentType.Question),
  };
};

export function markDownEditorFieldCollection(config){
  return  { 
    questionNumber: config?.markDownEditors?.length + 1,     
    id: config?.markDownEditors?.length + 1,  
    name:`markDownEditor${(config?.markDownEditors?.length + 1).toString()}`,  
    type: config?.inputFieldOptions?.type,  
    placeHolderText: config?.inputFieldOptions?.askHomeWorkQuestionPlaceHolder,
    questionCreatedOnDateTime: Date.now(),
    markDownContent: null,
    value: "",
    multipleChoiceQuestionAnswerKey: "",
    multipleChoiceQuestionStudentAnswer: "",
    multipleChoiceQuestionStudentAnswerInputValue: "",
    multipleChoiceQuestionAnswerKeyInputValue: "",
    multipleChoiceQuestionExplanationAnswer: null,
    explanationQuestionAnswerKey: JSON.stringify(config?.homeWorkAnswerPlaceHolder),
    explanationQuestionAnswer: JSON.stringify(config?.homeWorkAnswerPlaceHolder),
    explanationAnswerCollection: [],
    commentsCollection: config?.commentsMarkDownEditors,
    markDownEditorFormInputFields: [],
    pointsPerQuestion: config?.pointsDistributionType,
    questionPoints: config?.questionPoints,
    pointsReceived: { userId: "", pointsReceived: 0 },
    totalPointsReceived: { userId: "", totalPointsReceived: 0 },
    videoUrl: ""
  } ;  
};

export function onlineMarkDownEditorFieldCollection( config ){
  return  { 
    type: config?.inputFieldOptions?.type, 
    inputType: config?.inputType, 
    inputValue: config?.inputValue,
    placeHolderText: config?.inputFieldOptions?.askHomeWorkQuestionPlaceHolder,
    questionCreatedOnDateTime: Date.now(),
    markDownContent: null,
    answerExplanationMarkDownContent: null,
    pointsAssigned: config?.pointsAssigned,
    pointsReceived: config?.pointsReceived,
    formId: config?.formId, 
    formType: config?.formType,
    formName: config?.formName,
    courseId: config?.courseId,
    formUuId: config?.formUuId, 
    onlineQuestionId: config?.onlineQuestionId,
    userId: config?.userId,
    files: [],
    questionPushNotificationSubscribers: [ config?.userId ],
    questionEmailNotificationSubscribers: [ config?.userId ],
    savedQuestion: [ config?.userId ],
    questionDifficultyLevel: config?.questionDifficultyLevel,
    questionCreatedBy: config?.questionCreatedBy,
    operatorId: config?.operatorId,
    videoUrl: config?.videoUrl,
    xAxisformQuestionPosition: config?.xAxisformQuestionPosition,
    yAxisformQuestionPosition: config?.yAxisformQuestionPosition,
    xAxisColumnPosition: config?.xAxisColumnPosition,
    yAxisColumnPosition: config?.yAxisColumnPosition,
    columnMinWidth: config?.columnMinWidth,
    columnMinHeight: config?.columnMinHeight,
    columnAlign: config?.columnAlign,
    position: config?.position
  };   
};

export function manageEditorsFieldCollection( config ){
  return {
    onlineQuestionId: config?.question?._id,
    type: config?.type,
    answerDateTime: Date.now(),
    markDownContent: null,
    courseId: config?.courseId,    
    userId: config?.userId,
    files: [],
    answerBy: config?.currentUser?.firstname,
    operatorId: config?.operatorId,
    videoUrl: ""
  };
};

export function manageCommentsFieldCollection( config ){
  return {
    onlineQuestionId: config?.question?._id,
    onlineQuestionAnswerId: config?.onlineQuestionAnswerId,
    commentParentId: config?.commentParentId,
    childComments: [],
    commentDateTime: Date.now(),
    commentBy: config?.currentUser?.firstname,
    markDownContent: JSON.stringify(config?.placeHolder),
    courseId: config?.courseId,
    userId: config?.userId,   
    files: [],
    operatorId: config?.operatorId,
    videoUrl: "",
    color: config?.color
  };
}

export function manageFormFieldCollection( config ){
  return {
    questionId: config?.question?._id,
    answerId: config?.answerId,
    formFieldGroupId: config?.formFieldGroupId,
    enableFormFieldGroup: config?.enableFormFieldGroup,
    inputType: config?.inputType,
    inputValue: config?.inputValue,
    labelType: config?.labelType,
    labelValue: config?.labelValue,
    formFieldCreatedOnDateTime: Date.now(),
    formFieldCreatedBy: config?.userId,
    markDownContent: null,  
    xAxisformFieldPosition: config?.xAxisformFieldPosition,
    yAxisformFieldPosition: config?.yAxisformFieldPosition,
    files: [],
    videoUrl: ""
  };
};

export function setFieldCollection(config, setMultipleChoiceValue, setMultipleChoiceLabelValue){
  return { 
    questionNumber: config?.questionNumber,
    markDownEditorNumber: config?.markDownEditorNumber,  
    id: config.inputFields?.length + 1 ,  
    name: ( config?.inputTypeValue === inputType.TextArea ) ? `editor${ (config?.inputFields?.length + 1).toString()}` : `input${ (config?.inputFields?.length + 1).toString()}`,  
    editorContentType: ( config.inputTypeValue === inputType.TextArea ) ? editorContentType.Explanation : ( config?.inputTypeValue === inputType.Video ) ? editorContentType.VideoPlayer :  editorContentType.MultipleChoice,
    type: config?.inputTypeValue,   
    placeHolderText: config?.inputFieldOptions?.placeHolder,
    value: "",
    videoUrl: "",
    questionAnsweredOnDateTime: null,
    labelTypeDropDownSelectedValue: config?.labelDropDownSelectedValue,
    inputTypeDropDownSelectedValue: config?.inputTypeValue,
    multipleChoiceValue: setMultipleChoiceValue( config?.inputFields, labelType.Alphabet, config?.inputFields?.length + 1, config?.questionNumber, config?.markDownEditorNumber ),
    multipleChoiceLabelValue: setMultipleChoiceLabelValue(config?.inputFields,  labelType.Alphabet, config?.inputFields?.length + 1, config?.questionNumber, config?.markDownEditorNumber ),
    multipleChoiceAnswerKeyValue: "",
    multipleChoiceAnswerValue: "", 
    multipleChoiceAnswerExplanationKeyValue: config?.placeHolder,
    explanationAnswerKey: config?.placeHolder,
    explanationAnswerValue: JSON.stringify( config?.placeHolder )
  }; 
}

export function explanationAnswerMarkDownEditorCollection( config ){
  return {
    questionNumber: config?.questionNumber,     
    id: config?.answerMarkDownEditors?.length + 1,  
    name:`answerMarkDownEditor${(config?.answerMarkDownEditors?.length + 1).toString()}`,  
    placeHolderText: config?.homeWorkAnswerPlaceHolder,
    questionAnsweredOnDateTime: Date.now(),
    questionAnsweredBy: config?.currentUser?.firstname,
    markDownContent: JSON.stringify(config?.homeWorkAnswerPlaceHolder),
    videoUrl: ""
  };
};

function updateMarkDownEditorOnEventNotification( fields, markDownEditorFieldName,  updateMarkDownEditor) {
  if ( fields?.length > 0 && fields ){
    updateMarkDownEditor( { data: fields, fieldName: markDownEditorFieldName } ); 
  };
};

