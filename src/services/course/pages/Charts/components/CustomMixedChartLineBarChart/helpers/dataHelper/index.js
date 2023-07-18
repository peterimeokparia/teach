export const optionsData = {
    title: {
      display: true,
      titleText: 'Course Lesson Outcomes',
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
      xStacked: true,
      xBeginAtZero: true,
      xSuggestedMin: 0,
      yStacked: true,
      yBeginAtZero: true,
      ySuggestedMin: 0,
      ySuggestedMax: 100
    },
    layout: {
      padding: 1
    }
  };

export function buildLineChartData ( props ) {

    if ( isEmptyObject( props ) ) return null;

    let { lineChartData, datasets } = props;

    let lineChartObject = {};

    let dataSetLength = datasets?.length;

    if ( lineChartData?.length > 0 ) {

        let lineData = [];

        lineChartData.forEach( item => {
            if ( item !== null ) {
                lineData.push(item);
            }
        })

        lineChartObject = {
        type: 'line',
        label: 'Line data',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        data: lineData.filter(Number),
        }

        datasets.splice(dataSetLength, 0, lineChartObject);
    }
}