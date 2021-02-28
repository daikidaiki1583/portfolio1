import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from '../../axios';

const Piegraph = () => {
  useEffect(() => {
    axios
      .get('/api/get/trainingrecord/count/menu', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  });

  const data = {
    labels: ['腕立て', '腹筋', 'スクワット', 'ダンベル'],
    datasets: [
      {
        data: [100, 120, 35, 35],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="">
      <Pie data={data} />
    </div>
  );
};

export default Piegraph;
