import { capitalizeFirstLetterOfString } from "services/course/helpers/PageHelpers";

export const optionsData = (outcome) => {
 return {
    title: {
      display: true,
      titleText: capitalizeFirstLetterOfString( outcome.title ),
      titleFontSize: 18
    },
    datalabels: {
      color: 'black',
      fontSize: 18
    }, 
    legend: {
      display: true,
      titleDisplay: true,
      titleColor: 'rgb(255, 99, 132)'
    },
    labels: {
      labelFontSize: 15
    },
    aspectRatio: {
      maintainAspectRatio: true,
      ratio: 5,
    },
    bar: {
      categoryPercentage: 0.5,
      barPercentage: 0.3
    },
    scales: {
      xStacked: true,
      xBeginAtZero: true,
      xSuggestedMin: 0,
      yStacked: true,
      yBeginAtZero: true,
      ySuggestedMin: 0,
      ySuggestedMax: 110
    },
    layout: {
      padding: 1
    }
  }    
};