import {
React,
useRef,
useEffect,
useState,
useMemo } from "react";

import { 
connect } from 'react-redux';
    
import * as d3 from "d3";
import './style.css';

const BarChart = ({ data = []  }) => {

    const dimensions = {
        width: 900,
        height: 500,
        margin: { top: 30, right: 30, bottom: 70, left: 60 }
    };

    // Get DOM object in useRef
    const svgRef = useRef( null );
    const { width, height, margin } = dimensions;

    // Set svg container size
    const svgWidth = width + margin.left + margin.right;
    const svgHeight = height + margin.top + margin.bottom;
    const xValue = d => d?.year;
    const yValue = d => d?.value;

    let xScale = null, yScale = null;

    useEffect(() => {

    // Create root container
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new dom elements.

    // Add an svg group 
    const svg = svgEl.append("g").attr("transform", `translate(${margin.left}, ${margin.right})`);

    xScale = d3
        .scaleBand()
        .range([ 0, width ])
        .padding(0.4);

    xScale.domain(data?.map(d => { return d?.year; }));


    yScale = d3
        .scaleLinear()
        .range([height, 0]);

    yScale.domain([0, d3.max( data, (d) => { return d?.value; })]);

    svg.append("g")
        .attr("transform", `translate(${0}, ${height})`)
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("y", height - 465 )
        .attr("x", width - 450 )
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Year");

    svg.append("g")
        .call( d3.axisLeft(yScale).tickFormat((d) => {
            return `$${d}`; 
        }).ticks(10))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -250)
        .attr("dy", "-5.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text("Stock Price");

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .on("mouseover", onMouseOver) //Add listener for the mouseover event
        .on("mouseout", onMouseOut)   //Add listener for the mouseout event
        .on("click", navigate)
        .attr("x", (d) => xScale(xValue(d)))
        .attr("y", (d) => yScale(yValue(d)))
        .attr("width", xScale.bandwidth())
        .transition()
         .ease(d3.easeLinear)
         .duration(400)
         .delay(function (d, i) {
             return i * 50;
         })
        .attr("height", (d) => { return height - yScale(d.value)});

    function navigate(d, i){
        alert('clicked me')
        alert(JSON.stringify(d))
        alert(JSON.stringify(i))
    }

    function onMouseOver(d, i){
        d3.select(this)
            .attr('class', 'highlight');
        d3.select(this)
            .transition()
            .duration(400)
            .attr('width', xScale.bandwidth() + 5)
            .attr("y", (d) => yScale(yValue(d)) - 10)
            .attr("height", function(d) { return height - yScale(d.value) + 10; });
    
        svg.append("text")
            .attr('class', 'val') 
            .attr("x", (d) => xScale(xValue(d)))
            .attr("y", (d) => yScale(yValue(d)))
            .text(function() {
                return [ '$' +i.value];  // Value of the text
            });
    }

    //mouseout event handler function
    function onMouseOut(d, i) {
        // use the text label class to remove label on mouseout
        d3.select(this).attr('class', 'bar');
        d3.select(this)
          .transition()     // adds animation
          .duration(400)
          .attr('width', xScale.bandwidth())
          .attr("y", function(d) { return yScale(d.value); })
          .attr("height", function(d) { return height - yScale(d.value); });

        d3.selectAll('.val')
          .remove()
    }

        
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

export default connect(mapState)(BarChart);