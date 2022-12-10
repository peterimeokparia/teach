import { buildBackGroundColor, borderShades } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import { restrictTextLength, capitalizeFirstLetterOfString } from 'services/course/helpers/PageHelpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
// import { buildLineChartData } from 'services/course/pages/Charts/components/CustomLineChart/helpers';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';

export function buildCourseLessonOutcomeData( props ) {
    if ( isEmptyObject( props ) ) return;

    let { lessons, courseOutcomes, outcomeInsights, selectedMultiSelectFormTypeOptions } = props; 

        let collection = [], labelCollection = [];   

        lessons.forEach( ( lesson, index ) => {

            getLabels( labelCollection, lesson?.title );

            let labels = getLessonLabelTitle( lesson );
            let id = getLessonLabelTitle( lesson );
            let currentLessonIndex = index;

            selectedMultiSelectFormTypeOptions?.forEach( ( lessonType ) => {

                let lessonOutcomes = getLessonOutcomes( lesson, courseOutcomes );
            
                lessonOutcomes.forEach(( outcome, index ) => { 

                let currentOutcomeInsight = outcomeInsights?.filter(type => type?.formType === lessonType?.value );
    
                    if ( outcome?._id && currentOutcomeInsight?.length > 0 ) {
    
                       let currentOutcomeIndex = index;
                       let insights = currentOutcomeInsight?.filter(insights => insights?.outcomeId === outcome?._id );
                       let totalNumberOfquestionsInOutcome = getTotalSumOfItems(insights, 'numberOfQuestionsInOutcome');
                       let totalNumberOfQuestionsPassedOutcome = getTotalSumOfItems(insights, 'numberOfQuestionsPassedOutcome');
                       let rate = getCoursePassRateCollection( totalNumberOfquestionsInOutcome, totalNumberOfQuestionsPassedOutcome );
    
                        if ( rate && typeof(rate) === 'number' ) {

                            collection.push({
                                type: 'bar',
                                labels,
                                fill: false,
                                label: getLessonOutcomeLabelTitle( outcome ),
                                data: assignValueToArray( currentLessonIndex, rate ),
                                borderColor: getBorderColor( lessonType?.value ), 
                                borderWidth: 2,
                                backgroundColor: getBackGroundColor( lessonType?.value, rate  ), 
                                barThickness: getBarThickness(),
                               // maxBarThickness: 58,
                                stack: getStackValue( currentOutcomeIndex, lessonType?.value ),
                                id
                            });
                        }
                    }
                });
            });
        });

    return { labels: labelCollection, datasets: collection };
}

function getCoursePassRateCollection( totalNumberOfquestionsInOutcome, totalNumberOfQuestionsPassedOutcome ) {
    return Math.round( ( ( totalNumberOfQuestionsPassedOutcome / totalNumberOfquestionsInOutcome ) * 100 ) );
}

function getTotalSumOfItems(collection, prop){
    let items = collection?.map(item => item[prop] );
    return items?.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
}
function getLessonOutcomes( lesson, courseOutcomes ) {
    return courseOutcomes?.filter( outcome => outcome?.lessonId === lesson?._id );
}

function getLessonLabelTitle( lesson ) {
    return `${restrictTextLength( lesson?.title, 15, 15 )}`;
}

function getLessonOutcomeLabelTitle( outcome ) {
    return capitalizeFirstLetterOfString( outcome?.title );
}

function getBorderColor( type ) {
    return borderShades( type );
}

function getBackGroundColor( lessonType, passRate ) {
    return buildBackGroundColor( lessonType, passRate );
}

function getBarThickness() {
    return 30;
}

function getStackValue( index, type ) {
    return `Stack_${type}`
    //return `Stack ${type}_${index}`;
    // return `Stack ${index}`;
}

function assignValueToArray( iterator, value ) {
    let collection = [];

    if ( typeof( iterator ) === 'number' && typeof( value ) === 'number' ) {

        if ( iterator > 0 ) {
            for ( let i = 0; i < iterator; ++i ) {
              collection[i] = null;
            }
        }

        collection.splice(iterator, 1, value)
    }
    return collection;
  }

function getLabels( labelCollection, labelTitle ) {
    labelCollection.push( `${restrictTextLength( labelTitle, 15, 15 )}` );
}
  
export const data  = ( labels, datasets ) =>  {
    return {
        labels, 
        datasets
    }
};