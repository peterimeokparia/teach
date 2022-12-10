import * as d3 from "d3";
import isEqual from "react-fast-compare";

export function setAxisLeft( props, svg, d3, xScale, yScale ){

    let { height, heightLabelOffset, boxwidth, axisLabelValue } = props;

    svg.append("g")
    .call( d3.axisLeft(yScale).tickFormat((d) => {
        return `${d}`; 
    }).ticks(10))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", ( height - heightLabelOffset ) )
    .attr("dy", "-8.1em")
    .attr("text-anchor", "end")
    .attr("stroke", "black")
    .text(axisLabelValue);
}

export function setLabelsOnLeftStatLines( props, svg, d3, xScale, yScale ) {

    let { data, compData, compMedian, median, height, width, boxheight,
        studentData, stuMedian, boxwidth, groupMedian } = props;

            svg.append("g")
                .append("line")
                .attr('class', 'median' )
                .attr('x1', xScale(0) )
                .attr('x2', xScale(18))
                .attr('y1', yScale(median))
                .attr('y2', yScale(median))
                .attr("dy", "-5.1em")
                .attr("text-anchor", "end")
                .attr("stroke", "red")
                .attr("stroke-width", "2");

            svg.append("g")
                .append("circle")
                .attr('cx', ( xScale(median) + width/2 ) - 5 )
                .attr('cy', yScale(median))
                .attr("r", "10")
                .attr("text-anchor", "end")
                .attr("stroke-width", "3")
                .attr("stroke", "blue")
                .attr("fill", "red") 

        if ( !isEqual( data, compData ) ) {
            svg.append("g")
                .append("line")
                .attr('class', 'median' )
                .attr('x1', xScale(0) )
                .attr('x2', xScale(18))
                .attr('y1', yScale(compMedian) )
                .attr('y2', yScale(compMedian))
                .attr("dy", "5em")
                .attr("text-anchor", "end")
                .attr("stroke", "blue")
                .attr("stroke-width", "2")

                svg.append("g")
                .append("circle")
                .attr("cx",  (xScale(compMedian) + width/2) + 20 )
                .attr("cy", yScale(compMedian))
                .attr("r", "10")
                .attr("text-anchor", "end")
                .attr("stroke-width", "3")
                .attr("stroke", "red")
                .attr("fill", "blue") 
        }
}

export function showTheVerticalLine( props, svg, d3, xScale, yScale ) {
    let { min, max, center, boxwidth, dataSetMax } = props;

    svg.append("line")
        .attr('class', ( ( max > dataSetMax ) ? 'dashed' : 'solid') )
        .attr("x1", ( ( center - boxwidth )  ) )
        .attr("x2", ( ( center - boxwidth )  ) )
        .attr("y1", yScale(min) )
        .attr("y2",  yScale(max) )
        .attr("stroke", "black");
}

export function showTheVerticalBox( props, svg, d3, xScale, yScale ) {
    let { q1, q3, center, boxwidth, rectHeight } = props;

    svg.append("rect")
        .attr("x", ( ( center - boxwidth ) / 2 ) )
        .attr("y", yScale(q3))
        .attr("height", ( yScale(q1) - yScale(q3) ) )
        .attr("width", boxwidth)
        .attr("stroke", "black")
        .style("fill", "#69b3a2");
}

export function showHorizontalStatLines( props, svg, d3, xScale, yScale ) {
    let { min, median, max, center, boxwidth, yValue,compMedian,
     q1, q3, percentile90th, percentile95th, percentile99th, 
     interQuantileRange, setInterQuantile, set25thPercentile, set75thPercentile,
     set90thPercentile, set95thPercentile, set99thPercentile, setMedian,
     setMin, setMax } = props; 

    svg.selectAll("toto")
        .data([min, median, compMedian, max])
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
}

export function setYscaleAxisPlotLines(props, svg, d3, xScale, yScale) {
    svg.call(d3.axisLeft(yScale));
}

export function setVerticalLabel( props, labelValue, svg, d3, xScale, yScale ) {
    let { height,  dataSetMax } = props;

    svg.append("g")
        .append("text")
        .attr("y", ( height - 10 ))
        .attr("x", ( xScale(dataSetMax) / 2) )
        .attr("text-anchor", "end")
        .attr("stroke", "black")
        .text(labelValue);
}