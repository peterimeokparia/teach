import * as d3 from "d3";
import { deepOrange, deepPurple, green, orange, red } from '@mui/material/colors';

export const boxPlotOrientation = {
    HORIZONTAL: 'HORIZONTAL',
    VERTICAL: 'VERTICAL',
};

export function buildBoxPlotLegendData( data, compData ) {
    
    const sorted_data = data.sort(d3.ascending);
    const sorted_compData = compData.sort(d3.ascending);
    const q1 = d3.quantile(sorted_data, 0.25);
    const median = d3.quantile(sorted_data, 0.5);
    const compMedian = d3.quantile(sorted_compData, 0.5);
    const q3 = d3.quantile(sorted_data, 0.75);
    const interQuantileRange = ( q3 - q1 );
    const lowerLimit = ( q1 - ( 1.5 * interQuantileRange ) );
    const upperLimit = ( q3 + ( 1.5 * interQuantileRange ) );
    const min = ( lowerLimit <= d3.min(data) ) ? d3.min(data) : lowerLimit;
    const max =  ( upperLimit >= d3.max(data) ) ? d3.max(data) : upperLimit;
    const dataSetMax = d3.max(data);
    const percentile90th = d3.quantile(sorted_data, 0.9);
    const percentile95th = d3.quantile(sorted_data, 0.95);
    const percentile99th = d3.quantile(sorted_data, 0.99);
    const compDataExists = ( compData && compData?.length > 0 );

    const legend = [
        { name:'Min',  value: min , color: "#d53e4f", color2: green[500] },
        { name:'Max',  value: max, color: "#000000", color2: deepOrange[500] },
        { name:'25th', value: q1 , color: "#d53e4f", color2: green[500] },
        { name:'Your Median', value: median, color: "#5e4fa2", color2: deepOrange[500] },
        { name:'75th', value: q3, color: "#000000", color2: orange[500] },
        { name:'90th', value: percentile90th , color: "#d53e4f", color2: red[500] },
        { name:'95th', value: percentile95th, color: "#000000", color2: green[500] },
        { name:'99th', value: percentile99th , color: "#d53e4f", color2: deepPurple[500] }, 
        { name:'Inter Quantile', value: interQuantileRange, color: "#000000", color2: deepOrange[500] },
        { name:'Class Median', value: compMedian,  color: "#0000ff", color2: "#0000ff" }
    ];

    return {
        legend
    }
}

export function legendProps( props ) {

    if ( !props ) return null;

    let { min, max, get25thPercentile, median, get75thPercentile, get90thPercentile, 
          get95thPercentile, get99thPercentile, interQuantile, compMedian } = props;

    let legend = [
        { name:'Min', value: min , color: "#d53e4f" },
        { name:'Max', value: max, color: "#000000" },
        { name:'25th Percentile', value: get25thPercentile , color: "#d53e4f" },
        { name:'50th Percentile', value: median, color: "#5e4fa2" },
        { name:'75th Percentile', value: get75thPercentile, color: "#000000" },
        { name:'90th percentile', value: get90thPercentile , color: "#d53e4f" },
        { name:'95th Percentile', value: get95thPercentile, color: "#000000" },
        { name:'99th Percentile', value: get99thPercentile , color: "#d53e4f" },
        { name:'Inter Quantile Range', value: interQuantile, color: "#000000" },
        { name:'Group Median', value: compMedian,  color: "#000000" }
    ];

    return {
        legend
    }
}