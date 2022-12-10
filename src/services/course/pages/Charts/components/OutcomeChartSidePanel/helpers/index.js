import { getInsights } from 'services/course/pages/Charts/components/helpers/insights';

export const dataPieSidePanelChart1 = ( insights ) => {
    if ( !insights ) return;
    let { numberOfQuestionsPassedOutcome, numberOfQuestionsFailedOutcome } = insights;
    let data = [ numberOfQuestionsPassedOutcome, numberOfQuestionsFailedOutcome ];
   return {
        height: '350px',
        width: '350px',
        title:'Total Passed vs Total Failed Questions In Outcome',
        labels: ['Pass', 'Fail'],
        datasets: [
          {
            label: '# of Votes',
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
        ],
      };
};

export const dataPieSidePanelChart2 = ( insights ) => {
  if ( !insights ) return;
    let { totalNumberOfAttemptedFailedQuestions, numberOfUnAttemptedQuestionsInOutcome } = insights;
    let data = [ totalNumberOfAttemptedFailedQuestions, numberOfUnAttemptedQuestionsInOutcome ];
    return {
        height: '300px',
        width: '350px',
        title: 'Attempted Failed vs Unattempted Failed Questions In Outcome',
        labels: ['Attempted', 'Unattempted'],
        datasets: [
          {
            label: '# of Votes',
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

export const dataPieSidePanelChart1Default = ( insights ) => {
  if ( !insights ) return;

  let { numberOfQuestionsPassedOutcome, numberOfQuestionsFailedOutcome } = getInsights(insights);
  let data = [ numberOfQuestionsPassedOutcome, numberOfQuestionsFailedOutcome ];
 return {
      height: '300px',
      width: '350px',
      title:'Total Passed vs Total Failed Questions',
      labels: ['Pass', 'Fail'],
      datasets: [
        {
          label: '# of Votes',
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
      ],
    };
};

export const dataPieSidePanelChart2Default = ( insights ) => {
  if ( !insights ) return;
  let { totalNumberOfAttemptedFailedQuestions, numberOfUnAttemptedQuestionsInOutcome } = getInsights(insights);
    let data = [ totalNumberOfAttemptedFailedQuestions, numberOfUnAttemptedQuestionsInOutcome ];
 return {
      height: '300px',
      width: '350px',
      title: 'Attempted Failed vs Unattempted Failed Questions',
      labels: ['Attempted', 'Unattempted'],
      datasets: [
        {
          label: '# of Votes',
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