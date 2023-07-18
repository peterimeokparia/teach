import { useRef, useEffect, useState } from "react";
import { setXscaleAxisPlotLines, setAxisBottom, 
    setLabelsOnTheBottomStatLines, showTheHorizontalLine, 
    showTheHorizontalBox, showVerticalStatLines, setHorizLabel   } from 'services/course/pages/Charts/components/BoxPlot/helpers/horizontalBoxPlot';
import { deepOrange, deepPurple, green, orange, red } from '@mui/material/colors';
import { legendProps } from 'services/course/pages/Charts/components/BoxPlot/helpers';
import * as d3 from "d3";

const useHorizontalBoxPlotHook = ( props ) => {

    let { data, compData, groupMedian, yourMedian, setYourMedian, axisLabelValue } = props;

    const width = 500;
    const height = 500;
    const rectHeight = 50;
    // Get DOM object in useRef
    const svgRef = useRef( null );
    // Set svg container size
    const svgWidth = width;
    const svgHeight = height;
    const heightLabelOffset = ( height - 30 );
    const widthLabelOffset = ( width + 30 );
    const center = 195;
    const boxwidth = 100;
    const boxheight = 150;
    const xValue = d => d;
    const yValue = d => d;
    const [ get25thPercentile, set25thPercentile ] = useState( undefined );
    const [ get75thPercentile, set75thPercentile ] = useState( undefined );
    const [ get90thPercentile, set90thPercentile ] = useState( undefined );
    const [ get95thPercentile, set95thPercentile ] = useState( undefined );
    const [ get99thPercentile, set99thPercentile ] = useState( undefined );
    const [ median, setMedian ] = useState( undefined );
    const [ compMedian, setCompMedian ] = useState( undefined );
    const [ interQuantile, setInterQuantile ] = useState( undefined );
    const [ min, setMin ] = useState( undefined );
    const [ max, setMax ] = useState( undefined );

    useEffect(() => {
        const margin = { top: 10, right: 30, bottom: 30, left: 80 };

        let xScale = null, yScale = null;
        // Create root container
        const svgEl = d3.select(svgRef.current);
        // Clear svg content before adding new dom elements.
        svgEl.selectAll("*").remove(); 
        // Add an svg group 
        const svg = svgEl.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);
        const sorted_data = data.sort(d3.ascending);
        const q1 = d3.quantile(sorted_data, 0.25);
        const median = d3.quantile(sorted_data, 0.5);
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

        if ( compDataExists  ) {
            const comp_sorted_data = compData.sort(d3.ascending);

            setCompMedian(  d3.quantile(comp_sorted_data, 0.5) );
        }

        xScale = d3
            .scaleLinear()
            .domain([0, d3.max( data, (d) => { return  d; })])
            .range([0, 400 ]);

        yScale = d3
            .scaleLinear()
            .domain([0, d3.max( data, (d) => { return  d; })])
            .range([height, 0]);

        let props = {
            d3, svg, data, groupMedian, yourMedian, setYourMedian, compData, axisLabelValue, width, height,
            svgRef, svgWidth, svgHeight, heightLabelOffset, rectHeight, widthLabelOffset, center, q1, q3,
            boxwidth, boxheight, xValue, yValue, compDataExists, get25thPercentile, set25thPercentile,interQuantileRange,
            get75thPercentile, set75thPercentile, get90thPercentile, set90thPercentile, get95thPercentile, set95thPercentile, 
            get99thPercentile, set99thPercentile, median, setMedian, compMedian, setCompMedian, interQuantile, setInterQuantile,
            min, setMin, max, setMax, margin, sorted_data, lowerLimit, upperLimit, percentile90th, percentile95th, percentile99th,
            svgEl, compDataExists, svg, d3, yScale
        };

        // setXscaleAxisPlotLines( props, svg, d3, xScale, yScale );
        setHorizLabel( props, axisLabelValue, svg, d3, xScale, yScale );
        setAxisBottom( props, svg, d3, xScale, yScale );   
        setLabelsOnTheBottomStatLines( props, svg, d3, xScale, yScale );
        showTheHorizontalLine( props, svg, d3, xScale, yScale  );
        showTheHorizontalBox( props, svg, d3, xScale, yScale );
        showVerticalStatLines( props, svg, d3, xScale, yScale );

    }, [ data, compMedian, widthLabelOffset  ]);

    let { legend } = legendProps( props );
        
    return {
        svgRef,
        svgWidth,
        svgHeight,
        legend
    };
};

export default useHorizontalBoxPlotHook;