export function getNewlyAddedQuestions(item, savedPinnedOrderedQuestions){
    if ( !item ) return;

    if ( savedPinnedOrderedQuestions?.length === 0 ) return;
    
    let savedIds = savedPinnedOrderedQuestions?.map( saved => saved?._id );

    if ( savedIds?.length > 0 ){
        if ( !savedIds?.includes( item?._id ) ) {
            return item;
         } else {
            return; 
        }   
    }
}

export function compareObjectsBeforeReload( array1, array2 ){
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

export function handleSingleQuestionForms( onlineQuestionId, currentCourseQuestions, setCurrentQuestions ) {
    if ( ! ( onlineQuestionId && currentCourseQuestions?.length === 1 )) return false;
    setCurrentQuestions( currentCourseQuestions );
    return true;
}