import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { inputType, elementMeta } from 'services/course/pages/QuestionsPage/helpers';
import { loadFormFieldPoints } from 'services/course/actions/formquestionpoints';
import { saveFormFieldAnswer, loadFormFieldAnswers, saveDraggableFormFieldAnswersPointsBeforeMove } from 'services/course/actions/formfieldanswers';

////// K Peter, move some of these logic to the middleware let's move that F to an A...?
function useDraggableListItemComponentHook( fieldProps, handleDraggableFormFieldAnswers, formFields ) {  
  let { 
    formBuilderState, saveFormField, loadFormFieldsByQuestionId, loadFormFieldAnswersByQuestionId, loadFormFieldAnswersByFormFieldId,
    addNewFormFieldAnswer, formUuId, eventId, formName, question, fields, formFieldAnswers, currentUser, studentsTotalPointsReceived, studentsTotalPointsReceivedFromPersistence 
  } =  fieldProps;

  const [ itemMoved, setItemMoved ] = useState( false );
  const [ saveAnwer, setSaveAnswer ] = useState( false );
  const [ DraggableListItemFormFields, setDraggableListItemFormFields ] = useState([]);
  const [ formAnswers, setFormAnswers ] = useState([]);
  const [ fieldMoved, setFieldMoved ] = useState( undefined );
  const dispatch = useDispatch();
  let formFieldsExist = DraggableListItemFormFields?.length > 0;
  let formAnswersExist = formAnswers?.length > 0;
  let checkForFormAnswers = !formAnswers || formAnswers?.length === 0;

  useEffect(() => {
    if ( formFields?.filter(item => item?.questionId === question?._id)?.length > 0 ) {
      setDraggableListItemFormFields( formFields?.filter(item => item?.questionId === question?._id) );
    }

    if ( formFieldAnswers?.length > 0 ) {
      setFormAnswers( formFieldAnswers?.filter( field => field?.questionId === question?._id  && 
        field?.inputType === inputType.DraggableListItem && 
          field?.formUuId === formUuId &&
            field?.userId === currentUser?._id ) );
    }
  }, [ fields, formFieldAnswers, question._id, currentUser._id  ]);

  const getFormFieldAnswer = ( element, formUuId ) => {
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
      selected: false,
      position: 0, 
      xAxisformFieldPosition: element?.xAxisformFieldPosition,
      yAxisformFieldPosition: element?.yAxisformFieldPosition,
      files: element?.files,
      videoUrl: element?.videoUrl,
      questionId: element?.questionId,
      userId: currentUser?._id,
      fieldId: element?._id,
      formType: element?.formType,
      formName: element?.formName,
      formUuId,
      eventId
    };
  };

  const handleAddingNewFormFieldAnswer = (field, answerFields) => {
    let ans = answerFields?.find(ans => ans?.fieldId === field?._id )

    if ( field && field?._id && !ans) {
      
      let formFieldAnswer = getFormFieldAnswer( field, formUuId );

      addNewFormFieldAnswer({ ...formFieldAnswer, points: 0  })
        .then( resp => { 
          loadFormFieldAnswersByFormFieldId( field?._id );
        }).catch( error => console.log( error ));  
    } 
  };

  useEffect(() => {
    let questionFields = formFields?.filter(item => item?.questionId === question?._id);

    let answerFields = formFieldAnswers?.filter( field => field?.questionId === question?._id  && 
      field?.inputType === inputType.DraggableListItem && 
        field?.formUuId === formUuId &&
          field?.userId === currentUser?._id );

    if ( formBuilderState === elementMeta.state.Taking && questionFields?.length > 0  && (!formAnswers || formAnswers?.length === 0 ) ) {

      questionFields.map( field =>  handleAddingNewFormFieldAnswer(field, answerFields));

      setFormAnswers( answerFields?.filter( field => field?.questionId === question?._id  && 
        field?.inputType === inputType.DraggableListItem && 
          field?.formUuId === formUuId &&
            field?.userId === currentUser?._id ) );
    }
  }, [ formFields?.filter(item => item?.questionId === question?._id)?.length > 0 && (!formAnswers || formAnswers?.length === 0 ) ]);

  useEffect(() => { 
    if ( formBuilderState === elementMeta.state.Manage && fields?.length > 0  ) {
      loadFormFieldsByQuestionId( question?._id );
      setDraggableListItemFormFields( fields?.filter( field => field?.questionId === question?._id && field?.inputType === inputType.DraggableListItem ) );
    }
    if ( formBuilderState === elementMeta.state.Taking && formFieldAnswers?.length > 0  ) {
      loadFormFieldAnswersByQuestionId( question?._id );
      setFormAnswers( formFieldAnswers?.filter( field => field?.questionId === question?._id  && 
        field?.inputType === inputType.DraggableListItem && 
          field?.formUuId === formUuId &&
            field?.userId === currentUser?._id ) );
    }
  }, [ itemMoved ] );   

  function handleDraggableOnElementMove( element ) {
    dispatch( loadFormFieldPoints() );
    dispatch( loadFormFieldAnswers() );
    if ( formBuilderState === elementMeta.state.Manage ) {
      setFieldMoved( element );
      setItemMoved( true );
      saveFormField( element );
    }
    if ( formBuilderState === elementMeta.state.Taking ) {
      if ( element?.position === formAnswers?.find( ans => ans?._id === element?._id)?.position ) {
        return;
      }
      setFieldMoved( element );
      setItemMoved( true );
      let copy = { ...element, selected: false };

      dispatch( saveFormFieldAnswer( copy ) );
      dispatch( loadFormFieldAnswers() );
      loadFormFieldAnswersByFormFieldId( copy?.fieldId );

      let selectedCopy = { ...element, selected: true };

      const pointsBeforeMove = formFieldAnswers.map(item => item?.points)?.reduce((previousVal, currentVal) => previousVal + currentVal, 0);
      dispatch( saveDraggableFormFieldAnswersPointsBeforeMove( pointsBeforeMove ));
      handleFieldMoved( selectedCopy );
      dispatch( loadFormFieldAnswers() );
      loadFormFieldAnswersByFormFieldId( copy?.fieldId );
    }
  }

  function handleFieldMoved( element ){
    dispatch( loadFormFieldPoints() );
    dispatch( loadFormFieldAnswers() );
    if ( formBuilderState !== elementMeta.state.Taking ) return;
    if ( element ) {
      setFieldMoved( element );
      setSaveAnswer( true );
      let field = DraggableListItemFormFields?.find( field => field._id === element?.fieldId );
      let prevPosition = formAnswers?.find( ans => ans?._id === element?._id)?.position;
      let prevPoint = formAnswers?.find( ans => ans?._id === element?._id)?.points;

      if ( element?.position === prevPosition && prevPoint > 0 ) {
        return;
      }
      let copy = null, points = 0;

      if ( element?.points === 0 && element?.position.toString() === element?.answerKey ){
        points = ( ( element?.position?.toString() === element.answerKey && element?.selected ) ? field?.points : points ); // points = 0 being that it's been previously selected
        handleDraggableFormFieldAnswers(element, points, element?.position );
        dispatch( loadFormFieldAnswers() );
        loadFormFieldAnswersByFormFieldId( copy?.fieldId );
      }
      if ( element?.position.toString() !== element?.answerKey ){
        points =  ( ( element?.position?.toString() !== element.answerKey && element?.selected && prevPoint !== 0 ) ? field?.points : points );
        handleDraggableFormFieldAnswers( element, points, element?.position );
        dispatch( saveFormFieldAnswer( {...element, selected: true, points: 0 } ) ); /////
        dispatch( loadFormFieldAnswers() );
        loadFormFieldAnswersByFormFieldId( copy?.fieldId );
      }
      setItemMoved( false );
      setSaveAnswer( false );
    }
  }

  let draggableListItemProps = {
    itemCollection: formBuilderState === elementMeta.state.Taking ?  formAnswers : DraggableListItemFormFields,
    DraggableListItemFormFields,
    formAnswers,
    itemMoved,
    fieldMoved,
    saveAnwer, 
    setSaveAnswer,
    setItemMoved,
    handleFieldMoved,
    handleDraggableOnElementMove,
  };

return {
  draggableListItemProps
}; };

export default useDraggableListItemComponentHook;