export function updateCollection( answerField, formFieldAnsCollection, points ) {
    if ( answerField && formFieldAnsCollection.length > 0 ) {   
        let indexValue = formFieldAnsCollection?.findIndex(item => item?._id === answerField?._id );

        if ( typeof(indexValue) === 'number' && indexValue >= 0 ) {
            formFieldAnsCollection.splice(indexValue, 1, answerField );
        } else {
            formFieldAnsCollection = [ ...formFieldAnsCollection, { ...answerField, points } ];
        }
    }
    return formFieldAnsCollection;
}