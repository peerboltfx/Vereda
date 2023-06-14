import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { usePage } from '@inertiajs/inertia-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart() {
  const {programs, users} = usePage().props;

  const data = {

 
    labels: ['Admin', 'Moderators', 'Students', 'No Roles Users'],
    datasets: [
      {
        label: '# of Users',
        data: [users.admin, users.moderator,  users.students, users.optionl_students],
        backgroundColor: [
          '#7EC8E3 ',
          '#a2a2a2',
          '#318AD4',
          '#F8CF40',
        ],
        borderColor: [
          '#7EC8E3 ',
          '#a2a2a2',
          '#050A30',
          '#F8CF40',
         
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return <Pie data={data} />;
}
