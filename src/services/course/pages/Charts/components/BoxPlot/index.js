import { React } from "react";
import { connect } from 'react-redux';
import { boxPlotOrientation } from 'services/course/pages/Charts/components/BoxPlot/helpers';
import * as d3 from "d3";
import useHorizontalBoxPlotHook from 'services/course/pages/Charts/components/BoxPlot/hooks/useHorizontalBoxPlotHook';
import useVerticalBoxPlotHook from 'services/course/pages/Charts/components/BoxPlot/hooks/useVerticalBoxPlotHook';
import './style.css';

const BoxPlot = ({ boxPlotPosition, data, groupMedian, yourMedian, setYourMedian, compData, axisLabelValue  }) => {

    let props = { data, groupMedian, yourMedian, setYourMedian, compData, axisLabelValue }, boxPlotProps = null;

    if ( boxPlotPosition === boxPlotOrientation.HORIZONTAL ) {

        boxPlotProps = useHorizontalBoxPlotHook( props );
    }

    if ( boxPlotPosition === boxPlotOrientation.VERTICAL ) {

        boxPlotProps  = useVerticalBoxPlotHook( props  );
    }
    
    let { svgRef, svgWidth, svgHeight, legend } = Object(boxPlotProps);

    if ( !svgRef ) return <div>{'...please hold on.'}</div>;

    
return   (    
        <div className={'legend'}> 
            <div style={{width: 50, height: 150, marginLeft: '1vw', marginTop: boxPlotPosition === boxPlotOrientation.HORIZONTAL ? 30 : 10}}>
                <svg ref={svgRef} width={svgWidth} height={svgHeight} />
            </div>          
        </div> 
); };

const mapState = ( state )   => {
    return {
        currentUser: state.users.user
    };
};

export default connect(mapState)(BoxPlot);