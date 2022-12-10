import { isEmptyObject } from 'services/course/helpers/Validations';
import { getElementAtEvent } from 'react-chartjs-2';
import customDataLabelPlugin from 'services/course/pages/Charts/components/helpers/customPlugins/customDataLabelPlugin';

function chartOptions ( props ) {

    if ( isEmptyObject( props ) ) return null;

    let { chartRef, labels, datasets, groupedBarChartProps, optionsData } = props;

    if ( isEmptyObject( groupedBarChartProps ) ) return null;

    let { getChartPropsCallBack, setLabelTitle, outcome, handleSettingSelectedOutcome } = groupedBarChartProps;
  
    const options = {
      plugins: {
        tooltip: {
          callbacks: {
            label: context => handleLabelSelection( context, outcome )
          }
      },
        // maintainAspectRatio: true,
        title: {
          display: optionsData.title.display,
          text: optionsData.title.titleText,
          font: {
            size: optionsData.title.titleFontSize
        }
        },
        datalabels: {
          color: optionsData.datalabels.color,
          font: {
            size: optionsData.datalabels.fontSize
        }
    },
        legend: {
          display: optionsData.legend.display,
          title: {
              display: optionsData.legend.titleDisplay,
              color: optionsData.legend.titleColor
          },
          labels: {
              font: {
                  size: optionsData.labels.labelFontSize
              }
          },
          onClick: handleLegendSelection
        },
      },
      responsive: true,
      maintainAspectRatio: optionsData.aspectRatio.maintainAspectRatio,
      aspectRatio: optionsData.aspectRatio.ratio,
      categoryPercentage: optionsData.bar.categoryPercentage,
      barPercentage: optionsData.bar.barPercentage,
      scales: {
        x: {
          stacked: optionsData.scales.xStacked,
          beginAtZero: optionsData.scales.xBeginAtZero,
          suggestedMin: optionsData.scales.xSuggestedMin,
        },
        y: {
          stacked: optionsData.scales.yStacked,
          beginAtZero: optionsData.scales.yBeginAtZero,
          suggestedMin: optionsData.scales.ySuggestedMin,
          suggestedMax: optionsData.scales.ySuggestedMax
        },
      },
      // plugins: customDataLabelPlugin,
      layout: {
        padding: optionsData.layout.padding
      }
    };

    function handleLabelSelection ( context, outcome ) {

      let { label, element, datasetIndex, index } = context;

      setLabelTitle( label );
      handleSettingSelectedOutcome( outcome );
      getChartPropsCallBack( datasets[datasetIndex]?.label );
      return datasets[datasetIndex]?.label;
    }

    function handleLegendSelection ( e, legendItem, legend ) {  
        let datasetIndex = legendItem.datasetIndex;

        let { chart } = legend;

        chart.data.datasets.splice(datasetIndex, 1);

        let ci = legend.chart, metaSets = [];
    
        for (let i = 0; i < legend.chart.data.datasets.length; i++) {
          metaSets.push(ci.getDatasetMeta(i));
        }
        
        metaSets.forEach(function(meta) {
          meta.hidden = meta.index === datasetIndex ? true : false;
        });

        ci.update(); 
      }

    const onClick = (event) => {
        const { current: chart } = chartRef;
      
        if (!chart) {
          return;
        }
       printElementAtEvent(getElementAtEvent(chart, event));
    };
  
    const printElementAtEvent = ( chartElement ) => {
      if (!chartElement.length) return;
  
      const { element, datasetIndex, index } = chartElement[0];
  
      setLabelTitle( labels[index] );
    };
      
    return { props : { options, onClick } }
}

export default chartOptions;
