import { 
editorContentType,
labelType } from 'services/course/pages/FormBuilder/helpers';

import {
inputType } from 'services/course/pages/QuestionsPage/helpers';

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
  
  export function onlineMarkDownEditorFieldCollection(config){
    return  {   
      type: config?.inputFieldOptions?.type,  
      placeHolderText: config?.inputFieldOptions?.askHomeWorkQuestionPlaceHolder,
      questionCreatedOnDateTime: Date.now(),
      markDownContent: JSON.stringify(config?.placeHolder),
      courseId: config?.courseId,
      onlineQuestionId: config?.onlineQuestionId,
      userId: config?.userId,
      files: [],
      questionPushNotificationSubscribers: [ config?.userId ],
      questionEmailNotificationSubscribers: [ config?.userId ],
      savedQuestion: [ config?.userId ],
      questionDifficultyLevel: config?.questionDifficultyLevel,
      questionCreatedBy: config?.questionCreatedBy,
      operatorId: config?.operatorId,
      videoUrl: config?.videoUrl
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
      formId: config?.formId,
      parentComponentId: config?.parentComponentId,
      formFieldGroupId: config?.formFieldGroupId,
      formType: config?.formType,
      formName: config?.formName,
      formUuId: config?.formUuId,
      enableFormFieldGroup: config?.enableFormFieldGroup,
      selected: config?.selected,
      inputType: config?.inputType,
      inputValue: config?.inputValue,
      dropDownOptions: config?.dropDownOptions,
      labelType: config?.labelType,
      labelValue: config?.labelValue,
      formFieldCreatedOnDateTime: Date.now(),
      formFieldSavedOnDateTime: Date.now(),
      formFieldCreatedBy: config?.userId,
      markDownContent: null,  
      answer: config?.answer,
      answerKey: config?.answerKey,
      pointsRecived: config?.pointsRecived,
      points: config?.points,
      xAxisformFieldPosition: config?.xAxisformFieldPosition,
      yAxisformFieldPosition: config?.yAxisformFieldPosition,
      files: [],
      videoUrl: "",
      questionId: config?.questionId,
      userId: config?.userId
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

  export function getFormFieldAnswers( answerProps ){

    let {
      element, 
      question, 
      currentUser, 
      formUuId, 
      eventId
    } = answerProps;

    return { 
      formId: element?.formId,
      parentComponentId: element?.parentComponentId,
      formFieldGroupId: element?.formFieldGroupId,
      enableFormFieldGroup: element?.enableFormFieldGroup,
      inputType: element?.inputType,
      inputValue: element?.inputValue,
      dropDownOptions: element?.dropDownOptions,
      labelType: element?.labelType,
      labelValue: element?.labelValue,
      formFieldCreatedOnDateTime: element?.formFieldCreatedOnDateTime,
      formFieldSavedOnDateTime: Date.now(),
      formFieldCreatedBy: element?.formFieldCreatedBy,
      markDownContent: element?.markDownContent, 
      answer: element?.answer,
      answerKey: element?.answerKey,
      pointsReceived: element?.pointsReceived,
      points: element?.points, 
      xAxisformFieldPosition: element?.xAxisformFieldPosition,
      yAxisformFieldPosition: element?.yAxisformFieldPosition,
      files: element?.files,
      videoUrl: element?.videoUrl,
      questionId: element?.questionId,
      userId: currentUser?._id,
      fieldId: element?._id,
      formType: question?.formType,
      formName: question?.formName,
      formUuId,
      eventId
    };
  }

  export  const questionInputCollection = [ 
    inputType.MainBodyQuestion,
    inputType.MainBodyHeader,
    inputType.MainBodyTableColumnQuestion,
    inputType.MathScienceQuestion
  ];
  
  export  const formFieldInputCollection = [ 
    inputType.Text, inputType.TextLabel, 
    inputType.RadioButton, inputType.DropDown, 
    inputType.Explanation, inputType.CheckBox, 
    inputType.Date, inputType.Time, 
    inputType.DateTime, inputType.Toggle,
    inputType.DataObjectSelector, inputType.Number,
    inputType.NumberPosition, inputType.NumberPercentage,
    inputType.FileUpload, inputType.LatexField,
    inputType.MathScienceRadioButton
  ];