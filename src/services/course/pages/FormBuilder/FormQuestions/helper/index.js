export const rePositionRecords = ( collection, sortRecords ) => {

    let tempArray = [];

    let sortedRecords = sortRecords( collection, 'position' );
        sortedRecords?.forEach((element, index) => {
            tempArray.push({...element, position: (index +1) });
        });
    return tempArray;
};

export function chartProps(lessons, lessonId, studentQuestionInsights, courseOutcomes, formName, formType, currentUser) {
    let lessonItem = lessons?.find( lesson => lesson?._id === lessonId );
    let lessonOutcomeInsight = studentQuestionInsights?.filter(insights => insights?.formName === formName && insights?.formType === formType && insights?.userId === currentUser?._id );
    let lessonOutcomes = courseOutcomes?.filter(item => item?.lessonId === lessonId );
    return {
      outComeBarChartProps: {
        lessonItem, courseOutcomes, outcomeInsights: lessonOutcomeInsight, outcomes: courseOutcomes, lessonOutcomes
      }
    }
};