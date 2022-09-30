// import { manageFormFieldCollection } from 'services/course/pages/FormBuilder/helpers/formFieldHelpers';
// import { onlineMarkDownEditorFieldCollection } from 'services/course/pages/QuestionsPage/helpers';
export const axis = {
  x: 'x', y: 'y'
};

export const addFormFieldConfig = ( { typeOfInput, question, uuid, currentUser } ) => {
    return {
      formId: question?.formId, parentComponentId: uuid, formFieldGroupId: uuid, formType: question?.formType,
      formName: question?.formName, formUuId: question?.formUuId, enableFormFieldGroup: false, selected: false,
      inputType: typeOfInput, inputValue: "", dropDownOptions: [], labelType: "Roman", labelValue: "", formFieldCreatedOnDateTime: Date.now(),
      formFieldSavedOnDateTime: Date.now(), formFieldCreatedBy: currentUser?._id, markDownContent: null, answer: null, answerKey: null,
      pointsReceived: 0, points: 0, position: 0, xAxisformFieldPosition: 4, yAxisformFieldPosition: 0, files: [], videoUrl: "", 
      questionId: question?._id, userId: currentUser?._id
    };
};

export const addGroupedFormFieldsConfig = ( element, formUuId, currentUser, pointValue, formFields ) => {
    return  {
      formId: element?.formId, parentComponentId: element?.parentComponentId, formFieldGroupId: element?.formFieldGroupId,
      formType: element?.formType, formName: element?.formName, formUuId: formUuId, enableFormFieldGroup: false, inputType: element?.inputType,
      selected: false, inputValue: "", dropDownOptions: element?.dropDownOptions, labelType: element?.labelType, labelValue: "", formFieldCreatedOnDateTime: Date.now(),
      formFieldSavedOnDateTime: Date.now(), formFieldCreatedBy: currentUser?._id, markDownContent: null, answer: null, answerKey: null, pointsReceived: 0,
      points: 0, position: 0, xAxisformFieldPosition: element?.xAxisformFieldPosition, yAxisformFieldPosition: incrementCoordinateBySetPointValue( formFields, element?.formFieldGroupId, pointValue, axis?.y ),
      files: [], videoUrl: "", questionId: element?.questionId, userId: currentUser?._id
    };
};
// in progress
// export function copyExistingSingle( questionId, props ){
//     let { 
//       formNameToCopy, 
//       formUuidToCopy, 
//       formName, 
//       formUuId, 
//       formType,
//       addNewOnlineQuestion,
//       addNewFormField } = props;

//     let existingQuestion = formQuestionCollection?.find( question => question?.formName === formNameToCopy && 
//       question?.formUuid === formUuidToCopy && question?._id === questionId );

//     let existingFormFields = formFieldCollection?.filter( fields => fields?.formName === formNameToCopy && 
//       fields?.formUuid === formUuidToCopy && fields?.questionId === questionId );

//     const uuid = uuidv4();
//     if ( existingQuestion && existingFormFields?.length > 0 ) {
//         generateNewQuestionSet( existingQuestion, existingFormFields, props );
//     } 
// };

// export function copyExisting( props ){

//     let { 
//       formNameToCopy, 
//       formUuidToCopy, 
//       formName, 
//       formUuId, 
//       formType,
//       addNewOnlineQuestion,
//       addNewFormField } = props;

//     let existingQuestions = formQuestionCollection?.filter( question => question?.formName === formNameToCopy && 
//       question?.formUuid === formUuidToCopy);

//     let existingFormFields = formFieldCollection?.filter( fields => fields?.formName === formNameToCopy && 
//       fields?.formUuid === formUuidToCopy);

//     //const uuid = uuidv4();

//     existingQuestions?.forEach(existingQuestion => {
//         generateNewQuestionSet( existingQuestion, existingFormFields, props );
//     });  
// };

// export function generateNewQuestionSet( existingquestion, existingFormFields, props ) {
//     // copy question existingQuestions
//     // formType: newFormType ? newFormType : existingQuestion?.formType
//     // formName:newFormName
//     // formUuId: newFormUuId
//     let { 
//       formId,
//       formType,
//       formName,
//       courseId,
//       formUuId, 
//       onlineQuestionId,
//       existingQuestion,
//       currentUser,
//       operator, // get operator
//       addNewOnlineQuestion  } = props;

//     let config = {  
//       formId,
//       formType: formType ? formType : existingQuestion?.formType,
//       formName,
//       courseId,
//       formUuId, 
//       onlineQuestionId,
//       markDownContent: existingQuestion?.markDownContent,
//       userId: currentUser?._id, 
//       questionCreatedBy: ( currentUser?._id ) ? ( currentUser?.firstname ) : 'anonymous', 
//       operator: operator?._id,
//       inputFieldOptions: null, 
//       placeHolder: existingQuestion?.markDownContent,
//       explanationPlaceHolder: "Explain answer and any concepts.",
//       pointsAssigned: 0,
//       pointsReceived: 0, 
//       videoUrl: null,
//       xAxisformQuestionPosition: 100,
//       yAxisformQuestionPosition: 100,
//       xAxisColumnPosition: 100,
//       yAxisColumnPosition: -4,
//       columnMinWidth: 100,
//       columnMinHeight: 10,
//       columnAlign: 'left'
//     };
  
//     addNewOnlineQuestion( onlineMarkDownEditorFieldCollection( config ) )
//     .then( newQuestion => {
//       generateNewFormFieldSet( newQuestion, existingFormFields, props );
//     })
//     .catch( error => { console.log( error )});
// };

// function generateNewFormFieldSet( question, existingFormFields, props ){ 

//   let {   
//     addNewFormField, 
//     currentUser } = props;

//   let formFieldCollection = existingFormFields?.filter( field => field?.questionId === question?._id );

//   formFieldCollection?.forEach( formFields => {
//     let config = {
//       formId: question?.formId,
//       parentComponentId: formFields?.parentComponentId,
//       formFieldGroupId: formFields?.formFieldGroupId,
//       formType: question?.formType,
//       formName: question?.formName,
//       formUuId: question?.formUuId,
//       enableFormFieldGroup: formFields?.enableFormFieldGroup,
//       selected: formFields?.selected,
//       inputType: formFields?.inputType,
//       inputValue: formFields?.inputValue,
//       dropDownOptions: formFields?.dropDownOptions,
//       labelType: formFields?.labelType,
//       labelValue: formFields?.labelValue,
//       formFieldCreatedOnDateTime: formFields?.formFieldCreatedOnDateTime,
//       formFieldSavedOnDateTime: Date.now(),
//       formFieldCreatedBy: currentUser?._id,
//       markDownContent: formFields?.markDownContent,
//       answer: formFields?.answer,
//       answerKey: formFields?.answerKey,
//       pointsReceived: formFields?.pointsReceived,
//       points:formFields?.points,
//       xAxisformFieldPosition: formFields?.xAxisformFieldPosition,
//       yAxisformFieldPosition: formFields?.yAxisformFieldPosition,
//       files:formFields?.files,
//       videoUrl: formFields?.videoUrl,
//       questionId: question?._id,
//       userId: currentUser?._id
//     };
  
//     addNewFormField( manageFormFieldCollection( config ) );

//   });
// };

export const handleChangedValue = ( inputValue, setInputValue, element, saveFormField  ) => {
    setInputValue( inputValue );
    saveFormField( element );
};

export function incrementCoordinateBySetPointValue( formFields, formFieldGroupId, pointValue, axis ){
  if ( !formFields || formFields?.length === 0 ) throw Error( 'set formField Collection');
  if ( !formFieldGroupId  ) throw Error( 'set formFieldGroupId');
  if ( !pointValue  ) throw Error( 'set pointValue');
  if ( !axis  ) throw Error( 'set axis');

  let formFieldGroup = formFields?.filter( field => field?.formFieldGroupId === formFieldGroupId );

  let value = null;

  try {
    if ( !value && formFieldGroup?.length > 1 ) {
      return value ?? getIncrementedMaxCoordinateValue( formFieldGroup, pointValue, axis  );
    }
  } catch (error) {
    console.warn( error?.message );
  }
  return value ?? getCoordinateValueWithOneGroupFormFieldInCollection( formFieldGroup, pointValue, axis );
}

function getCoordinateValueWithOneGroupFormFieldInCollection( formFieldGroups, pointValue, axis ){
  if ( formFieldGroups.length === 1 )
    return pointValue;
  return ( undefined );
}

function getIncrementedMaxCoordinateValue( formFieldGroup, pointValue, axis  ){
  if ( formFieldGroup.length > 1 ) {
    let formFieldGroupCoordinates = formFieldGroup.map( element => {
      return getAxisPointValue( element, axis );
    });

    if ( formFieldGroupCoordinates?.length > 0 ) {
      return ( getMaxCoordindateValue( formFieldGroupCoordinates ) + pointValue );
    }
  }
  return undefined;
}

function getAxisPointValue( element, fieldAxis ){
   if ( fieldAxis === axis?.x )
    return element?.xAxisformFieldPosition;
  else 
    return element?.yAxisformFieldPosition;
}

function getMaxCoordindateValue( formFieldGroupCoordinates ){
  return formFieldGroupCoordinates.reduce( function( a, b ){
     return Math.max( a, b );
  });
}
