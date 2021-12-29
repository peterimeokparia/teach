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
loadFormFieldPoints } from 'services/course/actions/formquestionpoints';

function useAssignPointsHook( props ) {

    let {
        courseId, 
        formType,
        formName,
        formUuId,
        currentUser,
        question, 
        saveOnlineQuestion, 
        formFieldElement,
        elememtFormFields,
        saveFormField
    } = props;
    
    const dispatch = useDispatch();
    const [ points, setPoints ] = useState(0);

function addFieldPoints( pointsAssigned ){
    addPoints( pointsAssigned, formFieldElement, saveFormField, setPoints );
    
    let cummulativeScore = 0;

    elememtFormFields.forEach(element => {
        cummulativeScore += element?.points;    
    });      

    dispatch( loadFormFieldsByFormFieldId( formFieldElement?.fieldId  ) );
    dispatch( loadOnlineQuestionsByQuestionId( question?._id ) );
    saveOnlineQuestion({ ...question, pointsAssigned: cummulativeScore }); 
};

function handleTogglingModal( e, requestCloseFunc ){
    dispatch( loadFormFieldsByFormFieldId( formFieldElement?.fieldId  ) );
    dispatch( loadOnlineQuestionsByQuestionId( question?._id ) );

    let cummulativeScore = 0;

    elememtFormFields.forEach(element => {
        cummulativeScore += element?.points;
    });       

    saveOnlineQuestion({ ...question, pointsAssigned: cummulativeScore });
    requestCloseFunc( e );
};
    
return {
    addFieldPoints,
    handleTogglingModal,
}; };

export default useAssignPointsHook;