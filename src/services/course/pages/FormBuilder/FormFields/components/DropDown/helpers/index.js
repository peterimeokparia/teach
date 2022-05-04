export function getPreviouslySelectedDropDownAnswer( formFieldAnswer, questionId, fieldId ){
  
    if ( !formFieldAnswer || ( formFieldAnswer?.isArray && formFieldAnswer?.length === 0) ) return 0;

    if ( !questionId ) return;

    let previouslySelected = null;

    if ( formFieldAnswer?.isArray && formFieldAnswer?.length > 0 ) {
        previouslySelected = formFieldAnswer?.find(element => element?.questionId === questionId && 
                            element?.fieldId === fieldId );

    } else {
        previouslySelected = formFieldAnswer; 

    }
    
    if ( previouslySelected && ( previouslySelected?.answerKey === previouslySelected?.answer ) ) {

       return previouslySelected?.points; 
     
    }

    return 0;
}