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
import { Chart } from 'react-chartjs-2';
import { data } from 'services/course/pages/Charts/components/helpers/customChartHelpers/customBarChartHelper/groupedStackedBarChartDataHelper';
import { loadStudentQuestionInsightByFormType } from 'services/course/actions/studentQuestionInsights';
import topLabelsAfterDataSetDrawPlugin from 'services/course/pages/Charts/components/helpers/customPlugins/topLabelsAfterDataSetDrawPlugin';
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

const CustomChart = ({ groupedBarChartProps, labels, datasets, type, chartOptions, optionsData, classNameMain='chartWrapperMain', classNameSub='chartWrapperSub'}) => {    

  const chartRef = useRef( null );

  let chartOptionProps = { chartRef, groupedBarChartProps, labels, datasets, optionsData };

  let { options, onClick } = chartOptions( chartOptionProps )?.props;
  
  return <div class={classNameMain}> 
          <div class={classNameSub}> 
            <Chart ref={chartRef} type={type}  options={options}  data={data( labels, datasets )} onClick={onClick}/>
          </div> 
         </div>  
}

export default connect( null, { loadStudentQuestionInsightByFormType })( CustomChart );


