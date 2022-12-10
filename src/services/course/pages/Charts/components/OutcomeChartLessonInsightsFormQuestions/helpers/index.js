import { getInsights } from 'services/course/pages/Charts/components/helpers/insights';
import { capitalizeFirstLetterOfString } from 'services/course/helpers/PageHelpers';
import { resultProp, getTheNumberOfQuestionsResultForAttemptedOutcomes, getInsightsData } from 'services/course/middleware/outcomeInsight/helpers';
import MeasurableOutcomeResult from 'services/course/pages/Lessons/LessonNote/components/MeasurableOutcomeResult';

export function buildBackGroundColor( passRate ) {     
  if ( passRate === 50 ) {
    return 'rgb(255, 165, 0)';
  }

  if ( passRate < 50 ) {
    return 'rgb(255, 0, 0)';
  }

  if ( passRate > 50 ) {
    return 'rgb(60, 179, 113)';
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


export const getTertiaryData = ( insights, outcomes ) => {
  if ( insights?.length === 0 ) return;

  if ( outcomes?.length === 0 ) return;

  let insightsData = insights?.map(item => { 
    
    let passRateCollection = insights?.filter(insights => insights?.outcomeId === item?.outcomeId );
    let { numberOfQuestionsPassedOutcome, percentageNumberOfQuestionsPassedOutcome } = getTheNumberOfQuestionsResultForAttemptedOutcomes( passRateCollection, resultProp.numberOfQuestionsPassed );

    return {
     outcomeId: item?.outcomeId, 
     questionPassRateInOutcome: percentageNumberOfQuestionsPassedOutcome
  }});
  
//delete
return // lessonInsightsMeasurableOutcomeResult = [
          //   {header:'#Questions Passed',rate: numberOfQuestionsPassedOutcome, passFailRate: '', title:'', width:90, minWidth:200, iconColor: green[500], avatarText: '#'},
          //   {header:'#Questions Missed',rate: numberOfQuestionsFailedOutcome, passFailRate: '', title:'', width:90, minWidth:200, iconColor:deepOrange[500], avatarText: '#'},
          //   {header:'%Pass',rate:Math.round((numberOfQuestionsPassedOutcome / numberOfQuestionsInOutcome) * 100), passFailRate:'', title:'', width:90, minWidth:200, iconColor: green[500], avatarText:'%'},
          //   {header:'%Fail',rate:Math.round((numberOfQuestionsFailedOutcome / numberOfQuestionsInOutcome) * 100), passFailRate:'', title:'', width:90, minWidth:200, iconColor: deepOrange[500], avatarText:'%'},
          //   {header:'#Attempted Fail', rate:totalNumberOfAttemptedFailedQuestions, passFailRate:'', title:'', width:90, minWidth:200, iconColor:orange[500], avatarText:'AF'},
          //   {header:'#Unattempted Fail', rate:numberOfUnAttemptedQuestionsInOutcome, passFailRate:'', title:'', width:90, minWidth:200, iconColor:red[500], avatarText:'UF'},
          //   {header:'Total # Questions', rate:numberOfQuestionsInOutcome, passFailRate:'', title:'', width:90, minWidth: 200},
          //   {header:'Coaching', rate:numberOfStudentsInCoaching, passFailRate:'', title:'', width:90, minWidth:200, iconColor:green[900], avatarText:'C'}
          // ];
};


export const dataPieChart3 = ( insights, outcomes ) => {

  if ( insights?.length === 0 ) return;

  if ( outcomes?.length === 0 ) return;

  let insightsData = insights?.map(item => { 
    
    let passRateCollection = insights?.filter(insights => insights?.outcomeId === item?.outcomeId );

    let { numberOfQuestionsPassedOutcome, percentageNumberOfQuestionsPassedOutcome } = getTheNumberOfQuestionsResultForAttemptedOutcomes( passRateCollection, resultProp.numberOfQuestionsPassed );

    return {
     outcomeId: item?.outcomeId, 
     questionPassRateInOutcome: percentageNumberOfQuestionsPassedOutcome
  }});
 
  let outcomeInsightsData = outcomes?.map( item =>  { 
    const ids = insightsData.map( item => item?.outcomeId );
    const questionPassRate = insightsData.map( item => item?.questionPassRateInOutcome );
    const id = item?._id;

    return {
    id, 
    title: item?.title,
    questionPassRate: questionPassRate[ids.findIndex(item => item === id )]
  }} );

  let outcomeLabelNames = outcomeInsightsData.map(item => capitalizeFirstLetterOfString( item?.title )  ); 
  let data = outcomeInsightsData.map( item => item?.questionPassRate );
  let backgroundColor = outcomeInsightsData.map( item => buildBackGroundColor(item.questionPassRate) ); 

 return {
      height: '50px',
      width: '450px',
      title: 'Outcome pass/Fail percentage',
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
