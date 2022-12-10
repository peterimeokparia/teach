import { getInsights } from 'services/course/pages/Charts/components/helpers/insights';
import { capitalizeFirstLetterOfString } from 'services/course/helpers/PageHelpers';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';
import MeasurableOutcomeResult from 'services/course/pages/Lessons/LessonNote/components/MeasurableOutcomeResult';

const passRate50 = ( passRate ) => ( passRate === 50 );
const passRateLessThan50 = ( passRate ) => ( passRate < 50 );
const passRateGreaterThan50 = ( passRate ) => ( passRate > 50 );

export function buildBackGroundColor( lessonType, passRate  ) {     
  if ( passRate50( passRate ) ) {
    return shades( lessonType, passRate );
  }

  if ( passRateLessThan50( passRate ) ) {
    return shades( lessonType, passRate );
  }

  if ( passRateGreaterThan50( passRate ) ) {
    return shades( lessonType, passRate );
  }
}

function shades( type, passRate ) {
  switch (type) {
    case formTypes.lessoninsights:
      return[
              { formType: formTypes.lessoninsights, passRate: passRate50( passRate ), color: 'rgb(255, 236, 217)'},
              { formType: formTypes.lessoninsights, passRate: passRateLessThan50( passRate ), color: 'rgb(255, 224, 230)'},
              { formType: formTypes.lessoninsights, passRate: ( passRateGreaterThan50( passRate ) ), color: 'rgb(219, 243, 243)'},
            ]?.find( types => types.formType === type && types.passRate )?.color;
    case formTypes.quizzwithpoints:
      return[ { formType: formTypes.quizzwithpoints, passRate: passRate50( passRate ), color: 'rgb(255, 236, 217)'},
              { formType: formTypes.quizzwithpoints, passRate: ( passRateLessThan50( passRate ) ), color: 'rgb(255, 224, 230)'},
              { formType: formTypes.quizzwithpoints, passRate: ( passRateGreaterThan50( passRate ) ), color: 'rgb(219, 243, 243)'},
            ]?.find( types => types.formType === type && types?.passRate )?.color;
    case formTypes.homework:
      return[ { formType: formTypes.homework, passRate: passRate50( passRate ), color: 'rgb(255, 236, 217)'},
              { formType: formTypes.homework, passRate: ( passRateLessThan50( passRate ) ), color: 'rgb(255, 224, 230)'},
              { formType: formTypes.homework, passRate: ( passRateGreaterThan50( passRate ) ), color: 'rgb(219, 243, 243)'},
            ]?.find( types => types.formType === type && types?.passRate )?.color;
    default:
      return '';
  }
}

export function borderShades( type ) {
  switch (type) {
    case formTypes.lessoninsights:
      return `#1F51FF`;
    case formTypes.quizzwithpoints:
      return `#ccff00`;
    case formTypes.homework:
      return `#DF00FF`;
    default:
      return '';
  }
}

export const dataPieChart1 = ( insights ) => {
  if ( insights?.length === 0 ) return;

    let { numberOfQuestionsPassedOutcome, numberOfQuestionsFailedOutcome } = getInsights(insights);
    let data = [ numberOfQuestionsPassedOutcome, numberOfQuestionsFailedOutcome ];
   return {
        height: '50px',
        width: '350px',
        title:'Total Passed vs Total Failed Questions',
        labels: ['Pass', 'Fail'],
        datasets: [
          {
            label: '# of Votes dataPieChart1',
            data,
            backgroundColor: [
              'rgb(219, 243, 243)',
              'rgb(255, 224, 230)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
          },
        ]
      };
};

export const dataPieChart2 = ( insights ) => {
    if ( insights?.length === 0 ) return;

    let { totalNumberOfAttemptedFailedQuestions, numberOfUnAttemptedQuestionsInOutcome } = getInsights(insights);
    let data = [ totalNumberOfAttemptedFailedQuestions, numberOfUnAttemptedQuestionsInOutcome ];
    return {
        height: '250px',
        width: '350px',
        title: 'Attempted Failed vs Unattempted Failed Questions',
        labels: ['Attempted', 'Unattempted'],
        datasets: [
          {
            datalabels: {
              labels: {
                title: {
                  color: 'green'
                }
              }
            },
            label: '# of Votes dataPieChart2fdfd',
            data,
            backgroundColor: [
              'rgb(255, 224, 230)',
              'rgb(255,164,0)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1
          },
        ],
      };
}; 

export const dataPieChart3 = ( insights, outcomes, formType ) => {
  if ( insights?.length === 0 ) return;

  if ( outcomes?.length === 0 ) return;

  let testData = insights?.filter(item => item?.formType === formType)

  let insightsData = testData?.map(item => { return {
     outcomeId: item?.outcomeId, 
     numberOfQuestionsInOutcome: item?.numberOfQuestionsInOutcome
  }});
 
  let outcomeInsightsData = outcomes?.map( item =>  { 
    const ids = insightsData.map( item => item?.outcomeId );
    const numberOfQuestions = insightsData.map( item => item?.numberOfQuestionsInOutcome );
    const id = item?._id;

    return {
    id, 
    title: item?.title,
    numberOfQuestionsInOutcome: numberOfQuestions[ids.findIndex(item => item === id )]
  }} );

  let outcomeLabelNames = outcomeInsightsData.map(item => capitalizeFirstLetterOfString( item?.title )  ); 
  let data = outcomeInsightsData.map( item => item?.numberOfQuestionsInOutcome );
  let backgroundColor = insights.map( item => buildBackGroundColor(item.percentageNumberOfQuestionsPassedOutcome) ); 

 return {
      height: '50px',
      width: '400px',
      title: 'Number of questions in each outcome',
      labels: outcomeLabelNames,
      datasets: [
        {
          label: '# of Votes dataPieChart3',
          data,
          backgroundColor,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        },
      ]
    };
};

export function getNumberOfStudentsInCoaching( copyOutcomeInsights ){

  if ( !copyOutcomeInsights || copyOutcomeInsights?.length === 0 ) return;

  let listOfStudentsInCoaching = [];

   copyOutcomeInsights.forEach(element => {
      let temp = element?.listOfStudentsFailedQuestionsInOutcome;

      if ( temp ) {
        listOfStudentsInCoaching = [ ...listOfStudentsInCoaching, ...temp]; 
      } 
  }); 
    
  if ( listOfStudentsInCoaching?.length > 0 ) {
    listOfStudentsInCoaching = [ ...new Set( listOfStudentsInCoaching ) ];
  }
 
  return listOfStudentsInCoaching.length;
}

export function getTertiarySectionData( data ) {

  let { header, rate, passFailRate, title, width, minWidth, iconColor, avatarText } = data;

    return <div class="container">
      {<div className='row row-cols-4'>
          <div className='col col-data'>
            <MeasurableOutcomeResult header={header} rate={rate} passFailRate={passFailRate} title={title} width={width} minWidth={minWidth} iconColor={iconColor} avatarText={avatarText} />
          </div>
        </div>
      }
    </div>
}
