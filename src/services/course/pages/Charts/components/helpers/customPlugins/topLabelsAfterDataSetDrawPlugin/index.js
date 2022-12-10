import { getMaxValue, getLessonTitleCollection, getDataSetAvgByStack, buildChartTopLabel, buildLineChartData } from 'services/course/pages/Charts/components/helpers/customPlugins/helpers';

const topLabelsAfterDataSetDrawPlugin = {
    id: 'topLabelsAfterDataSetDrawPlugin',
    afterDatasetDraw: function(chart, args, options) {

      const { ctx, scales: { x, y } } = chart;

      const offSet = 3, topOffset = 5; 
      
      let lessonTitles = getLessonTitleCollection( chart );
  
        lessonTitles.forEach(( lesson, index ) => {

        let maxSum = getMaxValue( chart, lesson );
  
        const datasetArray = [], lessonIndex = index; 
        
        let xPixelValue = (args?.meta?.data[lessonIndex]?.x ) && args?.meta?.data[lessonIndex]?.x;
        
        let yPixelValue = y?.getPixelForValue(( maxSum + topOffset )) - offSet;
        
        let chartLabelProps = { 
          ctx, chart, lesson, lessonIndex, datasetArray, xPixelValue, yPixelValue
        };

        let avg = getDataSetAvgByStack( chartLabelProps );

        buildChartTopLabel( avg, chartLabelProps );
      });
    }
};

export default topLabelsAfterDataSetDrawPlugin;
