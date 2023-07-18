import { restrictTextLength } from 'services/course/helpers/PageHelpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import chroma from 'chroma-js';

export function buildCourseLessonOutcomeData( props ) {

    if ( isEmptyObject( props ) ) return;

        let { lessons, selectedMultiSelectFormTypeOptions } = props; 

        let { labelCollection, courseLandingInsightsLineChartData, formInsightsLineChartData } = buildLineChartDataSet( props );

        let mainChartDatasets = [], lineChartDatasets = [];

        lessons.forEach( ( lesson, index ) => ( handleLessons( lesson, index, mainChartDatasets, courseLandingInsightsLineChartData,  lineChartDatasets, formInsightsLineChartData, selectedMultiSelectFormTypeOptions ) ) );

    return { labels: labelCollection, mainChartDatasets, datasets: lineChartDatasets };
}

function handleLessons( lesson, lessonIndex,  mainChartDatasets, courseLandingInsightsLineChartData, lineChartDatasets, formInsightsLineChartData, selectedMultiSelectFormTypeOptions ) {

    addMainLineChartDataToNewCollection( mainChartDatasets, lesson, lessonIndex, courseLandingInsightsLineChartData );

    selectedMultiSelectFormTypeOptions?.forEach(formType => ( handleFormTypeSelection( formType, lineChartDatasets, lesson, lessonIndex, formInsightsLineChartData ) ) );
}

function handleFormTypeSelection(formType, lineChartDatasets, lesson, lessonIndex, formInsightsLineChartData ) {
    let lessonItemsChartData = formInsightsLineChartData.filter( item => item?.lessonTitle === lesson?.title && item?.lessonType === formType?.value );
    let borderColor = formType?.color; 
    let dataObject = lineChartDatasets?.find(item => item?.lessonType === formType?.value );

    if ( !handleExistinLineChartDataSetItems( dataObject, lessonItemsChartData, borderColor, lineChartDatasets, lesson, lessonIndex, formType ) ) {

        if (!handleExistingDataCollection( dataObject, null ) ) {

            addLineChartDataToNewCollection( borderColor, lineChartDatasets, lesson, lessonIndex, formType, null  );
        }
    }
    return lineChartDatasets;
}

function handleExistinLineChartDataSetItems( dataObject, dataSetItems, borderColor, lineChartDatasets, lesson, lessonIndex, formType ) {
    if ( !dataSetItems || dataSetItems?.length === 0  ) return false;

    let mappedValues = dataSetItems?.map(item => parseInt(item?.rate, 10));

    let mappedLength = mappedValues?.length;

    let sum =  mappedValues?.reduce((a,b) => parseInt(a, 10) + parseInt(b, 10), [0]);

    if ( mappedLength > 0  ) {

        let averageScore = Math.round( ( sum / mappedLength ) );

        if ( !handleExistingDataCollection( dataObject, averageScore ) ) {

            let averageScore = Math.round(  ( sum / mappedLength ) );

            addLineChartDataToNewCollection( borderColor, lineChartDatasets, lesson, lessonIndex, formType, averageScore  );
        }
    }

    return true;
}

function handleExistingDataCollection( dataObject, data ) {
    if ( !dataObject || dataObject?.length === 0 ) return false;

    dataObject.data.push( data );

    return true;
}

function addMainLineChartDataToNewCollection( lineChartDatasets, lesson, lessonIndex, courseLandingInsightsLineChartData  ) {

    let { rate } = courseLandingInsightsLineChartData?.find(item => item?.lessonTitle === lesson?.title );

    if ( lineChartDatasets?.length === 0 ) {

        lineChartDatasets.splice(lessonIndex, 0, {
            lesson: lesson?.title, 
            type: 'line',
            label: lesson?.title, 
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
            data: [ rate ],
        });

        return;
    }

    lineChartDatasets[0]?.data.splice(lessonIndex, 0, rate );
}

function addLineChartDataToNewCollection( borderColor, lineChartDatasets, lesson, lessonIndex, lessonType, data ) {
    lineChartDatasets.splice(lessonIndex, 0, {
        lesson: lesson?.title, 
        lessonType: lessonType?.value,
        type: 'line',
        label: lessonType?.value,
        borderColor,
        borderWidth: 2,
        fill: false,
        data: [ data ],
    });
}

function buildLineChartDataSet( props ) {

    let { lessons, courseOutcomes, outcomeInsights, selectedMultiSelectFormTypeOptions } = props; 

    let labelCollection = [], courseLandingInsightsLineChartData = [], formInsightsLineChartData = [];  

    lessons.forEach( lesson  => {

        getLabels( labelCollection, lesson?.title );

        let lessonOutcomes = getLessonOutcomes( lesson, courseOutcomes );

        getMainLineChartData( lesson, outcomeInsights, courseLandingInsightsLineChartData );

        selectedMultiSelectFormTypeOptions?.forEach( lessonType => { getFormTypeOptions( lesson, lessonType, lessonOutcomes, outcomeInsights, formInsightsLineChartData )});
    });

    return {
        labelCollection,
        courseLandingInsightsLineChartData,
        formInsightsLineChartData
    }
}

export function getMainLineChartData( lesson, outcomeInsights, courseLandingInsightsLineChartData ) {

    let insights = outcomeInsights?.filter(item => item?.lessonId === lesson?._id );

    let { rate } = getDataValue( insights );

    let dataIndex = courseLandingInsightsLineChartData?.length

    courseLandingInsightsLineChartData.splice(dataIndex, 0, { lessonTitle: lesson?.title, rate });
}

function getFormTypeOptions( lesson, lessonType, lessonOutcomes, outcomeInsights, formInsightsLineChartData ) {
    let currentOutcomeInsight = outcomeInsights?.filter( type => type?.lessonId === lesson?._id && type?.formType === lessonType?.value  );

        let { rate } = getDataValue( currentOutcomeInsight );

        if ( rate && typeof(rate) === 'number' ) {
            let dataIndex = formInsightsLineChartData.length;

            formInsightsLineChartData.splice( dataIndex, 0, { lessonTitle: lesson?.title, lessonType: lessonType?.value, rate } );
        }
}

function getDataValue(insights) {
    let totalNumberOfquestionsInOutcome = getTotalSumOfItems(insights, 'numberOfQuestionsInOutcome');
    let totalNumberOfQuestionsPassedOutcome = getTotalSumOfItems(insights, 'numberOfQuestionsPassedOutcome');
    let rate = getCoursePassRateCollection( totalNumberOfquestionsInOutcome, totalNumberOfQuestionsPassedOutcome );

    return { totalNumberOfquestionsInOutcome, totalNumberOfQuestionsPassedOutcome, rate  };
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

function getLabels( labelCollection, labelTitle ) {
    labelCollection.push( `${restrictTextLength( labelTitle, 15, 15 )}` );
}
  
export const data  = ( labels, datasets ) =>  {
    return { labels, datasets }
};

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  export const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma('#ffa500');
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data?.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data?.color,
        cursor: isDisabled ? 'not-allowed' : 'default',
  
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data?.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    multiValue: (styles, { data }) => ({ ...styles, ...dot(data?.color) }),
  };