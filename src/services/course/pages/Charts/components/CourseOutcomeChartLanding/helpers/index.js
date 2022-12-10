import { getInsights } from 'services/course/pages/Charts/components/helpers/insights';
import { capitalizeFirstLetterOfString } from 'services/course/helpers/PageHelpers';
import MeasurableOutcomeResult from 'services/course/pages/Lessons/LessonNote/components/MeasurableOutcomeResult';


export const dataPieChart1 = ( insights ) => {
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
              'rgb(60, 179, 113)',
              'rgb(255, 0, 0)'
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
              'rgb(255, 0, 0)',
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

export const dataPieChart3 = ( insights, lessonOutcomes ) => {
  let insightsData = insights.map(item => { return {
     outcomeId: item?.outcomeId, 
     numberOfQuestionsInOutcome: item?.numberOfQuestionsInOutcome
  }});
 
  let outcomeInsightsData = lessonOutcomes.map( item =>  { 
    const ids = insightsData.map( item => item?.outcomeId );
    const numberOfQuestions = insightsData.map( item => item?.numberOfQuestionsInOutcome );
    const id = item?._id;

    return {
    id, 
    title: item?.title,
    numberOfQuestionsInOutcome: numberOfQuestions[ids.findIndex(item => item === id )]
  }} );

  let outcomeLabelNames = outcomeInsightsData.map(item => capitalizeFirstLetterOfString( item?.title )  ); 

  let data = outcomeInsightsData.map(item => item?.numberOfQuestionsInOutcome );

 return {
      height: '50px',
      width: '400px',
      title: 'Number of questions in each outcome',
      labels: outcomeLabelNames,
      datasets: [
        {
          label: '# of Votes dataPieChart3',
          data,
          backgroundColor: [
            'rgb(159, 199, 242)',
            'rgb(122, 249, 243)',
            'rgb(158, 204, 237)'
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

export function getTertiarySectionData(data) {
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
