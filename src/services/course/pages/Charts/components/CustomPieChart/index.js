import React, { useRef } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Chart, Pie, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2';
import { isEmptyObject } from 'services/course/helpers/Validations';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './style.css';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  Title, 
  Tooltip, 
  Legend, 
  ChartDataLabels 
);

const CustomPieChart = ({ data, getOutcomeIdFromChartCallBack, handleSelectedFormType, selectedFormType, formTypeCollection }) => {

    if ( isEmptyObject( data ) ) return null;
    
    let { height, width, title } = data;

    const chartRef = useRef( null );

   const options = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: "top",
            align: "center",
            maxWidth: "1000px",
            title: {
                display: true,
                color: 'rgb(255, 99, 132)',
            },
            labels: {
                usePointStyle: true,
                color: 'rgb(255,255,255)',
                font: {
                  size: 18
                }
            },
        },
      }
    };
    
      const printElementAtEvent = ( element ) => {
        if (!element.length) return;
    
        const { datasetIndex, index } = element[0];

        getOutcomeIdFromChartCallBack( data.labels[index] );
      };
  
      const onClick = (event) => {
        const { current: chart } = chartRef;
    
        if (!chart) {
          return;
        }

       printElementAtEvent(getElementAtEvent(chart, event));
      };
      
    return <div className='chart' style={ {height: height, width: width }}>
            <>
            <label>{title}</label> 
              <Chart ref={chartRef} type={'pie'}options={options} data={data} onClick={onClick} />
            </>
            </div>
};
export default CustomPieChart;