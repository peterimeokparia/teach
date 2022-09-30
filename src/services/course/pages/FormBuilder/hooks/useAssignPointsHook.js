import { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import { addPoints } from 'services/course/pages/FormBuilder/helpers';
import { calculateCummulativePointsByQuestionId, loadFormFieldsByQuestionId } from 'services/course/actions/formfields';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { elementMeta } from 'services/course/pages/QuestionsPage/helpers';

function useAssignPointsHook( props ) {
    let {
        formBuilderState, question, formFieldElement, saveFormFieldPoints,
        saveFormField, previewMode, fieldGroup, handleAnswerPoints
    } = props;
    
    const [ points, setPoints ] = useState(0);
    const [ questionPoints, setQuestionPoints ] = useState(formFieldElement?.points);
    const dispatch = useDispatch();

    const assignQuestionPointsToRadioButtonFormFields = useCallback(( fieldGroup ) => {
        if ( formFieldElement?.inputType !== inputType.RadioButton ) return;

        assignQuestionPoints( fieldGroup );

        function assignQuestionPoints( fieldGroup ){
            try {
                let fieldWithOutPointsExists = fieldGroup?.find( field => field?.points === 0 );
        
                if ( formBuilderState === elementMeta?.state?.Manage && !previewMode && fieldWithOutPointsExists )  {
                    handleQuestionPoints( fieldGroup );
                }     
            } catch (error) {
                console.warn( error );
            }
        }
         
        function handleQuestionPoints( fieldGroup ){
            let questionPoints = fieldGroup?.find( field => field?.points > 0 )?.points;
        
            if ( questionPoints > 0 ) {
               return fieldGroup?.map( field => handleQuestionPointField( field ) );
            }
        }

        function handleQuestionPointField( field ){
            if ( field?.points === 0 ) {
                saveFormField({ ...field, points: questionPoints });  
            }
        }
    }, [ formFieldElement?.inputType, formBuilderState, previewMode, questionPoints, saveFormField  ] );

    const assignQuestionPointsToCheckBoxFormFields = useCallback(( fieldGroup ) => {
        if ( formFieldElement?.inputType !== inputType.CheckBox ) return;
        assignCheckBoxQuestionPoints( fieldGroup  );
        function assignCheckBoxQuestionPoints( fieldGroup ){
            try {
                if ( formBuilderState === elementMeta?.state?.Manage && !previewMode )  {
                    handleQuestionPoints( fieldGroup );
                }
            } catch (error) {
                console.log( error );
            }
        }
        
        function handleQuestionPoints( fieldGroup ){
            let points = fieldGroup?.find( field => field?.points > 0 )?.points;
        
            if ( points > 0 ) {
               return fieldGroup?.map( field => handleQuestionPointField( field ) );
            }
        }

        function handleQuestionPointField( field ){
            if ( field?.points === 0 ) {
                saveFormField({ ...field, points: questionPoints });  
            }
        }
    }, [ formFieldElement?.inputType, formBuilderState, previewMode, saveFormField, questionPoints ] );
 
    let fieldGroupExists = ( fieldGroup && previewMode );

    useEffect( () => {
        if ( fieldGroup && fieldGroup?.length > 0 ) {
            assignQuestionPointsToRadioButtonFormFields( fieldGroup );
            assignQuestionPointsToCheckBoxFormFields( fieldGroup );
        }
    }, [ fieldGroupExists, assignQuestionPointsToCheckBoxFormFields, assignQuestionPointsToRadioButtonFormFields, fieldGroup ]);

    useEffect( () => { 
        addFieldPoints( points ); 
    }, [ points ]);

    let updateQuestionPoints = ( questionPoints > 0 && questionPoints !== formFieldElement?.points && !previewMode );
    
    useEffect( () => {
        if ( questionPoints > 0 && !previewMode && questionPoints !== formFieldElement?.points ) {

            let answerKey = ( formFieldElement?.inputType === inputType.DraggableListItem ) ? formFieldElement?.position: questionPoints.toString()
            let copy = {...formFieldElement, points: questionPoints, labelValue: questionPoints.toString(), answerKey };

            saveFormField( copy );
        }
    }, [ updateQuestionPoints, formFieldElement, previewMode, questionPoints, saveFormField ]);

    function addFieldPoints( pointsAssigned ){
        try {
            addPoints( pointsAssigned, formFieldElement, saveFormFieldPoints, question, setPoints );

        } catch (error) {
            console.warn(`Problem assigning points.FormfieldElementId ${formFieldElement?._id}${ error }`);
        }
    }

    function addExplanationQuestionFieldPoints( pointsAssigned ){
        addFieldPoints( pointsAssigned );
        setQuestionPoints( pointsAssigned );
        return;
    }

    function addExplanationAnswerFieldPoints( pointsAssigned ){
        handleAnswerPoints( formFieldElement, pointsAssigned );
    }

return {
    points,
    setPoints,
    addExplanationQuestionFieldPoints,
    addExplanationAnswerFieldPoints
}; };

export default useAssignPointsHook;