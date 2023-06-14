import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

 

export function LineChart({optioning, datas,textName}) {
  const options = {
    responsive: true,
    bezierCurve:true,
    bezierCurveTension:0.4,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: textName,
      },
    },
  };
  
  return <Line options={options} data={datas} />;
}
