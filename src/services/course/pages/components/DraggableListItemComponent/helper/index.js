import {
getSortedRecordsByPosition } from 'services/course/selectors';

export const getSortedRecordsBasedOnPosition = ( itemCollection ) => {
    return getSortedRecordsByPosition( itemCollection );
};

export const getCummulativePointsForCorrectlySortedItems = ( studentsAnswerCollection, answerKeyyCollection ) => {
    let cummulativePoints = 0;
  
    studentsAnswerCollection?.map( (item, index) => {

        if ( item.position === answerKeyyCollection[ index ]?.position ) {
            cummulativePoints += item.points;
        }
    });

    return cummulativePoints;
};