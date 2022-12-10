import React, { useRef } from 'react';
import { connect } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart,  getDatasetAtEvent, getElementAtEvent, getElementsAtEvent } from 'react-chartjs-2';
import { data } from 'services/course/pages/Charts/components/helpers/customChartHelpers/customBarChartHelper/groupedStackedBarChartDataHelper';
import { loadStudentQuestionInsightByFormType } from 'services/course/actions/studentQuestionInsights';
import { buildLineChartData } from 'services/course/pages/Charts/components/CustomMixedChartLineBarChart/helpers/dataHelper';
import topLabelsAfterDataSetDrawPlugin from 'services/course/pages/Charts/components/helpers/customPlugins/topLabelsAfterDataSetDrawPlugin';
import chartOptions from 'services/course/pages/Charts/components/helpers/customChartHelpers/customBarChartHelper/chartHelper';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import './style.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  topLabelsAfterDataSetDrawPlugin,
  LineController,
  BarController
);

const CustomMixedChartLineBarChart = ({ groupedBarChartProps, labels, datasets, optionsData, lineChartData }) => {    

  const chartRef = useRef( null );

  let chartOptionProps = {
    chartRef, groupedBarChartProps, labels, datasets, optionsData, lineChartData
  };

  buildLineChartData( chartOptionProps );

  let { options, onClick } = chartOptions( chartOptionProps )?.props;

  return <div class="chartWrapperMain"> 
          <div class="chartWrapperSub"> 
              <Chart ref={chartRef} type={'bar'}  options={options}  data={data( labels, datasets )} onClick={onClick}/>
          </div> 
         </div>  
}

export default connect( null, { loadStudentQuestionInsightByFormType })( CustomMixedChartLineBarChart );


