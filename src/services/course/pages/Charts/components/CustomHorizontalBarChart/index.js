import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

//https://stackoverflow.com/questions/37856729/chart-js-2-how-to-set-bar-width
//https://www.chartjs.org/docs/latest/charts/bar.html
//https://stackoverflow.com/questions/43248520/pagination-in-bar-chart-using-chartjs
export const options = {
//   clip: {left: 5, top: false, right: -2, bottom: 0},
// clip: {left: 1200, top: 0,  right: false, bottom: 10},
responsive: true,
//   indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
    //   position: 'right',
    position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
                'January1', 'February1', 'March1', 'April1', 'May1', 'June1', 'July1', 'August1', 'September1', 'October1', 'November1', 'December1',
                'January2', 'February2', 'March2', 'April2', 'May2', 'June2', 'July2', 'August2', 'September2', 'October2', 'November2', 'December2',
                'January3', 'February3', 'March3', 'April3', 'May3', 'June3', 'July3', 'August3', 'September3', 'October3', 'November3', 'December3',
            ];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
    //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
    // data: labels.map(() => [ 1 ]),
      //data: [ 1, 2, 3 ] Qz1,
      data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1  
    ],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      barThickness: 5,    
    },
    {
      label: 'Dataset 2',
    //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
    //   data: labels.map(() => [2]),
      //data: [ 3, 4, 4 ]Qz2,
      data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1  
    ],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      barThickness: 5,     
    },
    {
        label: 'Dataset 3',
      //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
        // data: labels.map(() => [ 2 ]),
       // data: [ 7, 4, 5 ],
       data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1  
    ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(13, 12, 235, 0.5)',
        barThickness: 5,     
      },
      {
        label: 'Dataset 4',
      //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
        // data: labels.map(() => [ 2 ]),
       // data: [ 7, 4, 5 ],
       data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1  
    ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(813, 812, 235, 0.5)',
        barThickness: 5,     
      },
      {
        label: 'Dataset 5',
      //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
        // data: labels.map(() => [ 2 ]),
       // data: [ 7, 4, 5 ],
       data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1  
    ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(213, 12, 235, 0.5)',
        barThickness: 5,     
      },
      {
        label: 'Dataset 6',
      //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
        // data: labels.map(() => [ 2 ]),
       // data: [ 7, 4, 5 ],
       data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1  
    ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(63, 612, 235, 0.5)',
        barThickness: 5,     
      },
      {
        label: 'Dataset 7',
      //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
        // data: labels.map(() => [ 2 ]),
       // data: [ 7, 4, 5 ],
       data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        // 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1  
    ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(103, 92, 235, 0.5)',
        barThickness: 5,     
      },
      {
        label: 'Dataset 8',
      //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
        // data: labels.map(() => [ 2 ]),
       // data: [ 7, 4, 5 ],
       data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1  
    ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(321, 33, 235, 0.5)',
        barThickness: 5,     
      },
      {
        label: 'Dataset 9',
      //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
        // data: labels.map(() => [ 2 ]),
       // data: [ 7, 4, 5 ],
       data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1 
     ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(111, 112, 235, 0.5)',
        barThickness: 5,     
      },
      {
        label: 'Dataset 10',
      //   data: labels.map(() => fakeData.datatype.number({ min: -1000, max: 1000 })),
        // data: labels.map(() => [ 2 ]),
       // data: [ 7, 4, 5 ],
       data: [ 1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,  
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1,
        1, 2, 3, 3, 2, 1, 4, 2, 1, 2, 3, 1  
    ],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(173, 112, 235, 0.5)',
        barThickness: 5,     
      },
  ],
};

const CustomHorizontalBarChart = () => {
  return <Bar options={options} data={data} />
}

export default CustomHorizontalBarChart;
