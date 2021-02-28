import React, { FC, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from '../../axios';
import './Piegraph.scss';

const Piegraph: FC = () => {
  const [graphLabel, setLabel] = useState<string[]>([]);
  const [graphData, setData] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get('/api/get/trainingrecord/count/menu', {
        withCredentials: true,
      })
      .then((res) => {
        setLabel(Array.from(res.data, ({ menu }) => menu));
        setData(Array.from(res.data, ({ sum }) => sum));
      })
      .catch((err) => console.log(err));
  }, []);

  const data = {
    labels: graphLabel,
    datasets: [
      {
        data: graphData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
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
  const options = {
    legend: {
      labels: {
        fontColor: 'black',
        fontSize: 12,
      },
    },
  };
  return (
    <div className="component" id="piegraph">
      <h1>筋トレ種目比率</h1>
      <div>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Piegraph;
