import { getMaxValue, getLessonTitleCollection, getDataSetAvgByStack, buildChartTopLabel } from 'services/course/pages/Charts/components/helpers/customPlugins/helpers';

const topLabelsAfterDrawPlugin = {
    id: 'topLabelsAfterDrawPlugin',
    afterDraw: function ( chart, args, options ) {

      const { ctx, scales: { x, y } } = chart;
  
      const offSet = 3, topOffset = 5; 
      
      let maxSum = getMaxValue( chart, lesson );
   
      let lessonTitles = getLessonTitleCollection( chart );
  
        lessonTitles.forEach(( lesson, index ) => {
  
        const datasetArray = [], lessonIndex = index; 
        
        let chartLabelProps = { 
          ctx, chart, lesson, lessonIndex, datasetArray,
          xPixelValue: x?.getPixelForValue( lessonIndex ),
          yPixelValue: y?.getPixelForValue(( maxSum + topOffset )) - offSet,
        };

        let avg = getDataSetAvgByStack( chartLabelProps );
        buildChartTopLabel( avg, chartLabelProps );
      });
   }
};

export default topLabelsAfterDrawPlugin;