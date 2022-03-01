import { 
connect } from 'react-redux';

import {
schc,
vcit,
portfolio
} from 'services/course/pages/Charts/dataHelper';

import { 
useState } from 'react';

import BoxPlot from 'services/course/pages/Charts/components/BoxPlot';
import BarChart from 'services/course/pages/Charts/components/BarChart';
import MultiLineChart from 'services/course/pages/Charts/components/MultiLineChart';
import Legend from 'services/course/pages/Charts/components/BoxPlotLegend';

const barChartTestData = [ 
 { year: '2011',  value: 45 }, { year: '2014',  value: 70 },
 { year: '2012',  value: 47 }, { year: '2015',  value: 75 },
 { year: '2013',  value: 52 }, { year: '2016',  value: 78 },
 { year: '2017',  value: 80 }
];

const Charts = ({  }) => {

    const [ selectedItems, setSelectedItems ] = useState([]);
    const portfolioData = { name: "Portfolio", color: "#000000", items: portfolio.map(d => ({...d, date: new Date(d.date) } )) };
    const schcData = { name: "SCHC", color: "#d53e4f", items: schc.map(d => ({...d, date: new Date(d.date) } )) };
    const vcitData = { name: "VCIT", color: "#5e4fa2", items: vcit.map(d => ({...d, date: new Date(d.date) } )) };
    
    const legendData = [portfolioData, schcData, vcitData]
    const chartData = [ portfolioData, ...[ schcData, vcitData].filter( d => selectedItems.includes( d.name ) )]

    const dimensions = {
        width: 900,
        height: 500,
        margin: { top: 30, right: 30, bottom: 30, left: 60 }
    };

    const onChangeSelected = ( nameOfSelectedItem ) => {

        const newSelectedItems = selectedItems?.includes( nameOfSelectedItem ) // if already checked
        ? selectedItems.filter( item => item !== nameOfSelectedItem  ) // then handle unchecked scenario
        : [ ...selectedItems, nameOfSelectedItem ] // simulate checked scenario

        setSelectedItems( newSelectedItems );
    };
return   (    
        <div> 
            {/* <Legend 
                data={ legendData }
                selectedItems={ selectedItems }
                onChange={ onChangeSelected }
            /> */}

            <BoxPlot data={ barChartTestData?.map(d => { return d?.value}) }/>
            {/* <BarChart data={ barChartTestData }/> */}
           {/* <MultiLineChart data={ chartData } dimensions={ dimensions } /> */}
        </div> 
); };

const mapState = ( state )   => {
    return {
        currentUser: state.users.user
    };
};

export default connect(mapState)(Charts);