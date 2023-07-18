import * as d3 from "d3";
import isEqual from "react-fast-compare";

export function setXscaleAxisPlotLines( props, svg, d3, xScale, yScale ) {
    svg.call(d3.axisBottom(yScale));
}

export function setAxisBottom( props, svg, d3, xScale, yScale ){

    let { height, heightLabelOffset, boxwidth, axisLabelValue } = props;

    svg.append("g")
        .call( d3.axisBottom(xScale).tickFormat((d) => {
            return `${d}`; 
        }).ticks(10))
        .append("text")
        .attr("y", (  ( boxwidth )  )  )
        .attr("dy", "-10.1em")
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text(axisLabelValue);
}

export function setLabelsOnTheBottomStatLines( props, svg, d3, xScale, yScale ) {

    let {   data, compData, compMedian, boxwidth, median, width } = props;

        svg.append("g")
            .append("line")
            .attr('class', 'median' )
            .attr("y1", (yScale( median)/2) - 10     )
            .attr("x1", ( xScale(median)  )) 
            .attr("x2", ( xScale(median)  )) 
            .attr("text-anchor", "end")
            .attr("stroke", "red")
            .attr("stroke-width", "2");
    
        svg.append("g")
            .append("circle")
            .attr("cy", yScale(median)/2 )
            .attr("cx", ( xScale(median))) 
            .attr("r", "10")
            .attr("text-anchor", "end")
            .attr("stroke-width", "3")
            .attr("stroke", "blue")
            .attr("fill", "red") 
    
            if ( !isEqual( data, compData ) ) {
                svg.append("g")
                    .append("line")
                    .attr('class', 'median' )
                    .attr("y1", (yScale( compMedian) /2)  - 23   )
                    .attr("x1", ( xScale(compMedian)  )) 
                    .attr("x2", ( xScale(compMedian)  )) 
                    .attr("text-anchor", "end")
                    .attr("stroke", "blue")
                    .attr("stroke-width", "2")
        
                svg.append("g")
                    .append("circle")
                    .attr("cy", (yScale(compMedian)/2) - 15  )
                    .attr("cx", xScale(compMedian)) 
                    .attr("r", "10")
                    .attr("text-anchor", "end")
                    .attr("stroke-width", "3")
                    .attr("stroke", "red")
                    .attr("fill", "blue") 
            }   
}

export function showTheHorizontalLine( props, svg, d3, xScale, yScale ) {
    let { min, max, dataSetMax, center, rectHeight } = props;

    svg.append("line")
    .attr('class', ( ( max > dataSetMax ) ? 'dashed' : 'solid') )
    .attr("y1",  ( center - rectHeight )/2)
    .attr("y2",  ( center - rectHeight )/2)
    .attr("x1", xScale(min) )
    .attr("x2",  xScale(max)   )
    .attr("stroke", "black");
}

export function showTheHorizontalBox( props, svg, d3, xScale, yScale ) {
    let {  q1, q3, center, boxheight, rectHeight } = props;

    svg.append("rect")
        .attr("x", xScale(q1) )
        .attr("y", ( center - boxheight ) )
        .attr("height", rectHeight )
        .attr("width", (xScale(q3) - xScale(q1) ) )
        .attr("stroke", "black")
        .style("fill", "#69b3a2");
}

export function showVerticalStatLines( props, svg, d3, xScale, yScale ) {
    let { min, max, median, compMedian, center, boxheight,  xValue,
        q1, q3, percentile90th, percentile95th, percentile99th,
            interQuantileRange, set25thPercentile, set75thPercentile,
        set90thPercentile, set95thPercentile, set99thPercentile, setMedian,
        setMin, setMax, setInterQuantile } = props; 

    svg.selectAll("toto")
        .data([ min, median, compMedian, max ])
        .enter().append("line")
        .attr("x1", (d) => xScale(xValue(d)) )
        .attr("x2", (d) => xScale(xValue(d)) )
        .attr("y1", ( ( center - boxheight ) ) )
        .attr("y2",  ( center  )/2 )
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
}

export function setHorizLabel( props, labelValue, svg, d3, xScale, yScale ) {
    let {width,  dataSetMax  } = props;

    svg.append("g")
        .append("text")
        .attr("x", ( width - 10 ))
        .attr("y", ( yScale( dataSetMax ) / 2) )
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text(labelValue);
}