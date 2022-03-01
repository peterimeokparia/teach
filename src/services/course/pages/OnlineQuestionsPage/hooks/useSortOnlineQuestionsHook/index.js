import { 
useState, 
useEffect } from 'react';

import { 
useDispatch } from 'react-redux';

import { 
loadOnlineQuestions, 
toggleContentChanged } from 'services/course/actions/onlinequestions';

import {
loadFormBuilders } from 'services/course/actions/formbuilders'

import {
getOnlineQuestion } from 'services/course/pages/OnlineQuestionsPage/helpers';

function useSortOnlineQuestionsHook( onlineQuestionsConfig ){
    const dispatch = useDispatch();
    const [ currentQuestions, setCurrentQuestions ] = useState([]);
    const [ currentFormBuilders, setCurrentFormBuilders ] = useState(undefined);
   
    let {
        saveFormBuilder,
        formType, 
        formName,
        formUuId,
        formBuilderStatus,
        eventId,
        formBuilders,
        contentUpdated,
        currentUser
    } = onlineQuestionsConfig;

    let currentCourseQuestions = getOnlineQuestion( onlineQuestionsConfig );

    let currentFormBuilder = formBuilders?.find( builder => builder?.formName === formName && builder?.state === formBuilderStatus && builder?.formUuId === formUuId);

    useEffect(() => {

       let orderedFormQuestions = getExistingSortedOrderQuestions( currentCourseQuestions, currentFormBuilder?.orderedFormQuestions );

       let comparisonResultIsEqual = compareObjectsBeforeReload( orderedFormQuestions, currentQuestions );

       if ( !comparisonResultIsEqual ){

            if ( currentFormBuilder ) {

                setCurrentQuestions( orderedFormQuestions );

                saveFormBuilder( { ...currentFormBuilder, state: formBuilderStatus, orderedFormQuestions } );

                setCurrentFormBuilders( { ...currentFormBuilder, state: formBuilderStatus, orderedFormQuestions } );

            } 
       }

    });

    useEffect(() => {

        if ( contentUpdated ) {

            dispatch( loadFormBuilders() );

            dispatch( loadOnlineQuestions() );

            dispatch( toggleContentChanged() );

            let orderedFormQuestions =  getExistingSortedOrderQuestions( currentCourseQuestions, currentFormBuilder?.orderedFormQuestions );

            setCurrentQuestions( orderedFormQuestions );

            setCurrentFormBuilders( currentFormBuilder );

            // saveFormBuilder( { ...currentFormBuilder, state: formBuilderStatus, orderedFormQuestions } );

            // setCurrentFormBuilders( { ...currentFormBuilder, state: formBuilderStatus, orderedFormQuestions } );

        }

    }, [ contentUpdated ]);
       
    function getNewlyAddedQuestions(item, savedPinnedOrderedQuestions){
        let savedIds = savedPinnedOrderedQuestions?.map( saved => saved?._id );

        if ( savedIds?.length > 0 ){
            
            if ( !savedIds?.includes( item?._id ) ) {

                return item;

             } else {

                return 
            }   
        }

    }

    function getExistingSortedOrderQuestions( currentCourseQuestions, currentFormBuilderOrderedFormQuestions ){
        let tempQuestions = [], orderedFormQuestions= [];

        if ( !currentFormBuilderOrderedFormQuestions || currentFormBuilderOrderedFormQuestions?.length === 0 || currentFormBuilderOrderedFormQuestions[0] === null ) return currentCourseQuestions;

            currentFormBuilder?.orderedFormQuestions.forEach(element => {

            if ( currentCourseQuestions.map( question => question._id).includes( element?._id )){

                let currentQuestion = currentCourseQuestions?.find( question => question?._id === element?._id );
                
                tempQuestions.push( currentQuestion )
            }

        });

        let formQuestions =  currentCourseQuestions?.filter( question => getNewlyAddedQuestions(question, tempQuestions))

        return tempQuestions?.concat( formQuestions );
    }

    function compareObjectsBeforeReload( array1, array2 ){
        let result = [];

        if ( !array2 || !array1 ) return false;

        if ( array1?.length !== array2?.length ) return false;

            for( let index = 0; index < array1?.length; index++ ){

                 if ( array1[ index ]?._id === array2[ index ]?._id ){

                    result.push( true );

                 } else {

                    result.push( false );
                    
                 }
            };

        let tempResult = ( result?.includes( false ) === false );

        return tempResult;
    }

return {
    questions: currentQuestions,
    formBuilder: currentFormBuilders
}; };

export default useSortOnlineQuestionsHook;

