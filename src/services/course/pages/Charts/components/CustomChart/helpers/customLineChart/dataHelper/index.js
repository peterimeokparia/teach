export const optionsData = (title) => {
  return { title: {
    display: true,
    titleText: `${title}`,
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
    ratio: 4,
  },
  bar: {
    categoryPercentage: 0.8,
    barPercentage: 0.5
  },
  scales: {
    xStacked: false,
    xBeginAtZero: true,
    xSuggestedMin: 0,
    yStacked: false,
    yBeginAtZero: true,
    ySuggestedMin: 0,
    ySuggestedMax: 100
  },
  layout: {
    padding: 1
  } 
  }    
};