import {
React,
useRef,
useEffect,
useState,
useMemo } from "react";

import { 
connect } from 'react-redux';

import {
getXScale,
getYScale,
drawAxis,
drawLine,
animateLine
} from 'services/course/pages/Charts/helper'

import * as d3 from "d3";

const MultiLineChart = ({ data = [], dimensions = {}  }) => {
    // Get DOM object in useRef
    const svgRef = useRef( null );
    const { width, height, margin } = dimensions;

    // Set svg container size
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;

    // In order to detect what line to animate we need to store the previous data state
    const [ prevItems, setPrevItems ] = useState([]);
    const [ portfolioData ] = data;
    const { items } = portfolioData;


    const xScale = useMemo(
        () => getXScale( items , width), [portfolioData, width]
    );

    const yScale = useMemo(
        () => getYScale( items, height, 50), [portfolioData, height]
    );

    useEffect(() => {

    // Create root container
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new dom elements.

    // Add an svg group 
    const svg = svgEl.append("g").attr("transform", `translate(${margin.left}, ${margin.right})`);
    
    drawAxis( { 
        container: svg, 
        xScale, 
        ticks: 5, 
        tickSize: (-height + margin.bottom),
        transform: `translate(0, ${height - margin.bottom})` 
    });

    drawAxis( { 
        container: svg, 
        yScale, 
        ticks: 5, 
        tickSize:-width,
        tickFormat: (val) => `${val}%`
    });

    data.forEach( ( d ) => {

        const line = drawLine({ container: svg, data:d, xScale, yScale } );

        if (!prevItems.includes(d.name)) {

            animateLine({ element: line.node() });
        }

    });

    setPrevItems( data.map(( { name } ) => name )); 

}, [ data, xScale, yScale, margin ]);


  

return   (    
        <div> 
            <svg ref={svgRef} width={svgWidth} height={svgHeight} />
        </div> 
); };

const mapState = ( state )   => {
    return {
        currentUser: state.users.user
    };
};

export default connect(mapState)(MultiLineChart);