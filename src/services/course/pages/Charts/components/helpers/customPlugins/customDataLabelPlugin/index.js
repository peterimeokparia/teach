import { getStacksByLesson } from 'services/course/pages/Charts/components/helpers/customPlugins/helpers';

const customDataLabelPlugin = {
      datalabels: {
        anchor: 'end',
        align: 'top',
        formatter: ( value, context ) => {

          const { chart } = context;  

          const { ctx, scales: { x, y } } = chart;
    
            function getAverage() {
              let collection = [];
              let lessonTitles = [...new Set(chart.data.datasets?.map(data => data?.labels))];
        
              lessonTitles.forEach((lesson, index) => {
        
              const datasetArray = [], lessonIndex = index;
        
              let stacks = getStacksByLesson( chart, lesson );
        
              stacks?.forEach(( stack, index ) => {

                let dataSetItems = chart.data?.datasets?.filter( item => item?.labels === lesson && item?.stack === stack );
              
                  dataSetItems.forEach(( dataset, index ) => {
            
                    let value = dataset.data[lessonIndex];
  
                    if ( typeof(value) === 'number') {
                      datasetArray.push(value);
                    }
                  });
        
                function totalSum(total, values) {
                  return total + values;
                }
          
                let sum = datasetArray?.reduce(totalSum, 0);
        
                if ( datasetArray?.length > 0 ) {
                    collection.push({ lesson, stack, avg: Math.round( ( sum / datasetArray?.length ) ) });
                }
              });
            });
            return collection;
          }
          return getAverage()?.find( item => item?.lesson === chart.data.datasets[context.datasetIndex]?.labels )?.avg;         
        }
      }
};

export default customDataLabelPlugin



// formatter : {
//       // const dataSetArray = [];
//           // context.chart.data.datasets.forEach((dataset) => {
//           //   let dataValue = dataset?.data[ context?.dataIndex ];

//           //   if ( dataValue !== undefined ) {
//           //     dataSetArray.push( dataValue );
//           //   }
//           // });

//           // function totalSum(current, prev){
//           //   return current + prev;
//           // }

//           // let sum = dataSetArray.reduce(totalSum,0);
//           // return sum;
// }