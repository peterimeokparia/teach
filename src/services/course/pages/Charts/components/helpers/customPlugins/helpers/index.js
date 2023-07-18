export function getLessonTitleCollection( chart ) {
  return [ ...new Set(chart.data.datasets?.map(data => data?.labels)) ];
}

export function getDataSetAvgByStack( props ) {
  
  let { chart, lesson, lessonIndex, datasetArray } = props;

  let avg, stacks = getStacksByLesson( chart, lesson );

  stacks?.forEach(( stack ) => {
    let dataSetItems = chart.data?.datasets?.filter( item => item?.labels === lesson && item?.stack === stack );
   
      dataSetItems.forEach(( dataset ) => {
        let value = dataset.data[ lessonIndex ];

        if ( typeof(value) === 'number') {
          datasetArray.push(value);
        }
      });

    function totalSum(total, values) {
      return total + values;
    }

    let sum = datasetArray?.reduce(totalSum, 0);

    if ( datasetArray?.length > 0 ) {
      avg = Math.round( ( sum / datasetArray?.length ) );
    }
  });
  return avg;
}

export function buildChartTopLabel( value, props ) {
  
  let { ctx, xPixelValue, yPixelValue, chart } = props;

  const { scales: { x, y } } = chart; 

  ctx.font = 'bold 20px san-serif';
  ctx.fillStyle = 'rgba(255, 26, 104, 1)';
  ctx.textAlign = 'center';
   
  if ( typeof( value ) === 'number' ) {
    if ( xPixelValue ) {
      ctx.fillText(value, x?.getPixelForValue(0), yPixelValue ); 
      // ctx.fillText(value, xPixelValue, yPixelValue ); x?.getPixelForValue(index)
    }
  }
}

export function buildLineChartData( value, tempLineChartData ) {
  if ( value !== null ) {
    tempLineChartData.push(value);
  }
  return tempLineChartData;
}

export function getMinYaxisValue(collection) {  
  return collection?.reduce((a,b)=> Math.min(a,b), Infinity ); 
}

export function getMaxValue( chart, lesson ) {

    let stackIds = getStacks( chart ); let tempCollection = [];
  
    stackIds?.forEach( stack => {
      let dataCollection = chart.data.datasets?.filter( item => item?.type === 'bar' && item?.stack === stack && item?.labels === lesson ).map(item => {
        return item?.data.filter(Number)?.length > 0 && item?.data.filter(Number)[0]
      });
  
      tempCollection.push( dataCollection?.reduce((a,b) => { return parseInt(a) + parseInt(b) }, [0]));
  
    });
    return tempCollection?.reduce((a,b)=> Math.max(a,b), -Infinity ); 
}
  
export function getStacks( chart ) {
    return [...new Set( chart.data.datasets?.map(item => item?.stack))];
}
  
export function getStacksByLesson( chart , lesson ) {
    return [...new Set( chart.data.datasets?.filter(item => item?.labels === lesson )?.map( item => item?.stack ))];
}

