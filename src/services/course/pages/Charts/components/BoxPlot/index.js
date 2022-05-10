import {
React,
useRef,
useEffect,
useState,
useMemo } from "react";

import { 
connect } from 'react-redux';
    
import * as d3 from "d3";
import BoxPlotLegend from 'services/course/pages/Charts/components/BoxPlotLegend';
import './style.css';

const BoxPlot = ({ data = [], groupMedian = 0  }) => {

    groupMedian = 60; // delete

    const margin = {top: 10, right: 30, bottom: 30, left: 80},
        width = 400,
        height = 500;

    // Get DOM object in useRef
    const svgRef = useRef( null );
    // const { width, height, margin } = dimensions;

    // Set svg container size
    const svgWidth = width;
    const svgHeight = height;
    const heightLabelOffset = ( height - 30 );
    const yValue = d => d;

    const [ get25thPercentile, set25thPercentile ] = useState( undefined );
    const [ get75thPercentile, set75thPercentile ] = useState( undefined );
    const [ get90thPercentile, set90thPercentile ] = useState( undefined );
    const [ get95thPercentile, set95thPercentile ] = useState( undefined );
    const [ get99thPercentile, set99thPercentile ] = useState( undefined );
    const [ median, setMedian ] = useState( undefined );
    const [ interQuantile, setInterQuantile ] = useState( undefined );
    const [ min, setMin ] = useState( undefined );
    const [ max, setMax ] = useState( undefined );

    let xScale = null, yScale = null;

    useEffect(() => {

    // Create root container
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new dom elements.

    // Add an svg group 
    const svg = svgEl.append("g").attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Manage data. Sort data ascending.
    const sorted_data = data.sort(d3.ascending);
    const q1 = d3.quantile(sorted_data, 0.25);
    const median = d3.quantile(sorted_data, 0.5);
    const q3 = d3.quantile(sorted_data, 0.75);
    const percentile90th = d3.quantile(sorted_data, 0.9);
    const percentile95th = d3.quantile(sorted_data, 0.95);
    const percentile99th = d3.quantile(sorted_data, 0.99);
    const interQuantileRange = ( q3 - q1 );
    const min = ( q1 - ( 1.5 * interQuantileRange ) );
    const max = ( q3 + ( 1.5 * interQuantileRange ) );
    const dataSetMax = d3.max(data);

    xScale = d3
        .scaleLinear()
        .domain([0, d3.max( data, (d) => { return  d; })])
        .range([0, width]);

    yScale = d3
        .scaleLinear()
        .domain([0, d3.max( data, (d) => { return  d; })])
        .range([height, 0]);

    // Boxplot features
    const center = 200;
    const boxwidth = 100;

    // Set the Y scale axis
    svg.call(d3.axisLeft(yScale));

    svg.append("g")
        .append("text")
        .attr("y", ( height - 10 ))
        .attr("x", ( xScale(dataSetMax) / 2) )
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Year");

    svg.append("g")
        .call( d3.axisLeft(yScale).tickFormat((d) => {
            return `$${d}`; 
        }).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", ( height - heightLabelOffset ))
        .attr("dy", "-8.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Stock Price");

    // Show class median -- test
    svg.append("g")
        .append("text")
        .attr('class', 'median' )
        .attr("x1",  xScale(20))
        .attr("x2",  xScale(270))
        .attr("y1", yScale(70) )
        .attr("y2", yScale(70) )
        .attr("transform", "rotate(-180)")
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "red");

    svg.append("g")
        .append("text")
        .attr("x", ( (xScale(groupMedian) / 2) + boxwidth ) )
        .attr("y", ( yScale(groupMedian + 1) ))
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Class");

    // Show class median -- test
    svg.append("line")
        .attr('class', 'median' )
        .attr("x1", xScale(0) )
        .attr("x2",xScale(groupMedian) )
        .attr("y1", yScale(groupMedian) )
        .attr("y2", yScale(groupMedian) )
        .attr("stroke", "red");

    // Show the main vertical line
    svg.append("line")
        .attr('class', ( ( max > dataSetMax ) ? 'dashed' : 'solid') )
        .attr("x1", ( ( center - boxwidth )  ) )
        .attr("x2", ( ( center - boxwidth )  ) )
        .attr("y1", yScale(min) )
        .attr("y2",  yScale(max) )
        .attr("stroke", "black");

    // Show the box
    svg.append("rect")
        .attr("x", ( ( center - boxwidth ) / 2 ) )
        .attr("y", yScale(q3))
        .attr("height", ( yScale(q1) - yScale(q3) ) )
        .attr("width", boxwidth)
        .attr("stroke", "black")
        .style("fill", "#69b3a2");

     // Show median, min and max horizontal lines
    svg.selectAll("toto")
    .data([min, median, max])
    .enter().append("line")
        .attr("x1", ( ( center - boxwidth ) / 2 ) )
        .attr("x2", ( ( center + boxwidth ) / 2 ) )
        .attr("y1", (d) => yScale(yValue(d)) )
        .attr("y2", (d) => yScale(yValue(d)) )
        .attr("stroke", "black");

        set25thPercentile( q1 );
        set75thPercentile( q3 );
        set90thPercentile( percentile90th );
        set95thPercentile( percentile95th );
        set99thPercentile( percentile99th );
        setMedian( median );
        setMin( min );
        setMax( max );
        setInterQuantile( interQuantileRange );

}, [ data, xScale, yScale, margin ]);


const legend = [
    { name:'Min', value: min , color: "#d53e4f" },
    { name:'Max', value: max, color: "#000000" },
    { name:'25th Percentile', value: get25thPercentile , color: "#d53e4f" },
    { name:'50th Percentile', value: median, color: "#5e4fa2" },
    { name:'75th Percentile', value: get75thPercentile, color: "#000000" },
    { name:'90th percentile', value: get90thPercentile , color: "#d53e4f" },
    { name:'95th Percentile', value: get95thPercentile, color: "#000000" },
    { name:'99th Percentile', value: get99thPercentile , color: "#d53e4f" },
    { name:'Inter Quantile Range', value: interQuantile, color: "#000000" },
    { name:'Group Median', value: groupMedian,  color: "#000000" }
];
    

return   (    
        <div> 
            <svg ref={svgRef} width={svgWidth} height={svgHeight} />
            <BoxPlotLegend data={legend}/>
        </div> 
); };

const mapState = ( state )   => {
    return {
        currentUser: state.users.user
    };
};

export default connect(mapState)(BoxPlot);