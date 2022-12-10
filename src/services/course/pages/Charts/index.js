import { connect } from 'react-redux';
// import { schc, vcit, portfolio } from 'services/course/pages/Charts/dataHelper';
import { useState } from 'react';
import BoxPlot from 'services/course/pages/Charts/components/BoxPlot';
// import BarChart from 'services/course/pages/Charts/components/BarChart';
// import MultiLineChart from 'services/course/pages/Charts/components/MultiLineChart';
// import Legend from 'services/course/pages/Charts/components/BoxPlotLegend';

const barChartTestData = [ 
 { year: '2011',  value: 45 }, { year: '2014',  value: 70 },
 { year: '2012',  value: 47 }, { year: '2015',  value: 75 },
 { year: '2013',  value: 52 }, { year: '2016',  value: 78 },
 { year: '2017',  value: 80 }
];

const barChartTestData2 = [ 
    { questionId: '631c77d4d28ef4a4de2a7344',  value: 15 }, { questionId: '631c7428d28ef4a4de2a724e',  value: 0 },
    { questionId: '631c7428d28ef4a4de2a724e',  value: 0 }, { questionId: '6334fedd34ab9d9d81de4d1a',  value: 0 },
    { questionId: '6334fedd34ab9d9d81de4d1a',  value: 10 }, { questionId: '6334fedd34ab9d9d81de4d1a',  value: 10 },
    { questionId: '631c77d4d28ef4a4de2a7344',  value: 15 }
   ];

const barChartTestData222 = [ 
    { questionId: '631c77d4d28ef4a4de2a7344',  value: 15 },  
    { questionId: '631c7428d28ef4a4de2a724e',  value: 0 },  
    { questionId: '6334fedd34ab9d9d81de4d1a',  value: 0 }, 
    { questionId: '631c77d4d28ef4a4de2a7344',  value: 10 }
   ];


const test222 = [
    4.4,
    4.9,
    3,
    9,11,15,
    7,13,  26,
    6,13.2,14,12,
    2,
    8,
    1,
    4,
    3,
    3,
    7,
    6,
    2,
    8,
    4,
    4.3,
    3,
    7,
    4,
    2.8,
    1.9,
    6,
    1,
    3.1,
    9.2,
    7
];

const test2223333 = [
    4.4,
    4.9,
    3,
    9,11,15,
    7,13,  26,
    1,
    // 6,13.2,14,12,
    2,
    8,
    2,
    4,
    3,
    3,
    7,
    6,
    2,
    8,
    4,
    4.3,
    3,
    7,
    4,
    2.8,
    1.9,
    6,
    2,
    // 3.1,
    // 9.2,
    7
    // 55, 62, 35, 32, 50, 57, 54
    // 4.4,
    // 4.9,
    // 3,
    // 9,
    // 11,
    // 15,
    // 7,
    // 13,  
    // 26,
    // 6,
    // 13.2,
    // 14,
    // 12,
    // 7
];

const Charts = () => {
    const [ selectedItems, setSelectedItems ] = useState([]);
    const [ yourMedian, setYourMedian ] = useState(0);
    // const portfolioData = { name: "Portfolio", color: "#000000", items: portfolio.map(d => ({...d, date: new Date(d.date) } )) };
    // const schcData = { name: "SCHC", color: "#d53e4f", items: schc.map(d => ({...d, date: new Date(d.date) } )) };
    // const vcitData = { name: "VCIT", color: "#5e4fa2", items: vcit.map(d => ({...d, date: new Date(d.date) } )) };
    // const legendData = [portfolioData, schcData, vcitData];
    // const chartData = [ portfolioData, ...[ schcData, vcitData].filter( d => selectedItems.includes( d.name ) )];
    // const dimensions = {
    //     width: 900,
    //     height: 500,
    //     margin: { top: 30, right: 30, bottom: 30, left: 60 }
    // };
    const onChangeSelected = ( nameOfSelectedItem ) => {
        const newSelectedItems = selectedItems?.includes( nameOfSelectedItem ) // if already checked
        ? selectedItems.filter( item => item !== nameOfSelectedItem  ) // then handle unchecked scenario
        : [ ...selectedItems, nameOfSelectedItem ]; // simulate checked scenario

        setSelectedItems( newSelectedItems );
    };

return   (    
        <div> 
            {/* <Legend 
                data={ legendData }
                selectedItems={ selectedItems }
                onChange={ onChangeSelected }
            /> */}
            <div>
                <BoxPlot 
                    boxPlotPosition={'HORIZONTAL'}
                    // boxPlotPosition={'VERTICAL'}
                    data={ test222?.map(d => { return d; }) } 
                    compData={ test2223333?.map(d => { return d; }) }
                />
            </div>
            {/* <BoxPlot data={ barChartTestData2?.map(d => { return d?.value; }) }/> */}
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