import { 
useState, 
useEffect } from "react";

import {
useDispatch } from 'react-redux';

import { 
addPoints } from 'services/course/pages/FormBuilder/helpers';

import {
loadFormFieldsByFormFieldId } from 'services/course/actions/formfields';

import {
loadOnlineQuestionsByQuestionId } from 'services/course/actions/onlinequestions';

import {
inputType } from 'services/course/pages/QuestionsPage/helpers';

import {
elementMeta } from 'services/course/pages/QuestionsPage/helpers';

import { 
loadFormFieldPoints } from 'services/course/actions/formquestionpoints';

function useAssignPointsHook( props ) {

    let {
        courseId, 
        formType,
        formName,
        formUuId,
        currentUser,
        formBuilderStatus,
        question, 
        saveOnlineQuestion, 
        formFieldElement,
        elememtFormFields,
        saveFormField,
        previewMode,
        fieldGroup
    } = props;
    
    const dispatch = useDispatch();
    const [ points, setPoints ] = useState(0);

    useEffect( () => {

         if ( fieldGroup?.length > 0 ) {

            assignQuestionPointsToRadioButtonFormFields( fieldGroup );

            assignQuestionPointsToCheckBoxFormFields( fieldGroup );

         }

    }, [ previewMode ]);

function addFieldPoints( pointsAssigned ){
    
    addPoints( pointsAssigned, formFieldElement, saveFormField, setPoints );
    
    let cummulativeScore = 0;

    elememtFormFields.forEach(element => {
        cummulativeScore += element?.points;    
    });      

    dispatch( loadFormFieldsByFormFieldId( formFieldElement?.fieldId  ) );
    dispatch( loadOnlineQuestionsByQuestionId( question?._id ) );
    saveOnlineQuestion({ ...question, pointsAssigned: cummulativeScore }); 
}

function handleTogglingModal(){
    dispatch( loadFormFieldsByFormFieldId( formFieldElement?.fieldId  ) );
    dispatch( loadOnlineQuestionsByQuestionId( question?._id ) );

    let cummulativeScore = 0;

    elememtFormFields.forEach(element => {
        cummulativeScore += element?.points;
    });       

    saveOnlineQuestion({ ...question, pointsAssigned: cummulativeScore });

}

function assignQuestionPointsToRadioButtonFormFields( fieldGroup ){

    if ( formFieldElement?.inputType !== inputType.RadioButton ) return;

    assignQuestionPoints( fieldGroup );
}

function assignQuestionPointsToCheckBoxFormFields( fieldGroup ){

    if ( formFieldElement?.inputType !== inputType.CheckBox ) return;

    assignCheckBoxQuestionPoints( fieldGroup  );
}

function assignQuestionPoints( fieldGroup ){
    try {

        let fieldWithOutPointsExists = fieldGroup?.find( field => field?.points === 0 );

        if ( formBuilderStatus === elementMeta?.state?.Manage && !previewMode && fieldWithOutPointsExists )  {
    
            handleQuestionPoints( fieldGroup );
          
        }
        
    } catch (error) {
        console.log( error );
    }
}

function assignCheckBoxQuestionPoints( fieldGroup ){
    try {

        if ( formBuilderStatus === elementMeta?.state?.Manage && !previewMode )  {
    
            handleQuestionPoints( fieldGroup );
        }

    } catch (error) {
        console.log( error );
    }
}

function handleQuestionPoints( fieldGroup ){

    let questionPoints = fieldGroup?.find( field => field?.points > 0 )?.points;

    if ( questionPoints > 0 ) {

        fieldGroup?.map( field => {

            if ( field?.points === 0 ) {

                saveFormField({ ...field, points: questionPoints });
                
            }

        });

    }
}
    
return {
    addFieldPoints,
    handleTogglingModal,
}; };

export default useAssignPointsHook;