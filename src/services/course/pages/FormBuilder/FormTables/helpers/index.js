export function buildFormTableColumns( formQuestions, formName ){
    return formQuestions?.filter( question => question?.formName === formName )?.map( cols => {
         return {
            id: cols?._id,
            label: cols?.markDownContent, 
            minWidth: 200,  
            minHeight: 40,
            align: 'left',
            x: 100,
            y: -4
         }
    })
};

export function formToTableConverter( formQuestions, formAnswers, formName, formBuilders ){
    let rows = [], formUniqueIds = getFormUniqueIds( formName, formBuilders );

    if ( formQuestions?.length === 0 ) return;

    if ( formAnswers?.length === 0 ) return;

    formUniqueIds?.forEach( uniqueId => {  

        formQuestions?.forEach( question => {
          
          formAnswers?.filter( ans => ans?.questionId === question?._id && ans?.formUuId === uniqueId).forEach( (ansValue, index ) => {

            rows = [ ...rows, { uniqueId, index, qId:question?._id, ans: ansValue?.answer  }];  
        });
     }); 
    });   

    let tempRows = [];

    formUniqueIds?.forEach( uniqueId => {        
        let tempRowEntries =  Object.fromEntries( rows?.filter( rw => rw?.uniqueId === uniqueId)?.map(val => { return [ val?.qId, val?.ans ] }) );

        tempRows.push( tempRowEntries );
    });
    
    let colms = buildFormTableColumns( formQuestions, formName );

    return { rows: tempRows, columns: colms };
};

export function getMarkDownAsText( markDown ){
    return markDown?.split('<p class="graf graf--p">')[1]?.split('</p>')[0] 
};

function getFormUniqueIds( formName, formBuilders ){
    let submittedForms = formBuilders?.filter( form => form?.formName === formName && form?.status === 'Submitted' );

    return submittedForms?.map(form => { return form?.formUuId } );
};