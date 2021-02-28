import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Line, defaults } from 'react-chartjs-2';
import SelectMenu from '../atoms/selectMenu';
import axios from '../../axios';
import './LineGraph.scss';

const LineGraph: FC = () => {
  const [trainingid, setTrainingid] = useState<number>(1);
  const [graphLabel, setLabel] = useState<string[]>([]);
  const [graphData, setData] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get(`/api/get/trainingrecord/graph/${trainingid}`, {
        withCredentials: true,
      })
      .then((res) => {
        setLabel(
          res.data.map((obj: { date: string; sum: number }) =>
            dayjs(obj.date).format('MM/DD'),
          ),
        );
        setData(Array.from(res.data, ({ sum }) => sum));
      })
      .catch((err) => console.log(err));
  }, [trainingid]);

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrainingid(parseInt(e.target.value, 10));
  };

  const data = {
    labels: graphLabel,
    datasets: [
      {
        label: '回数',
        fill: false,
        data: graphData,
        backgroundColor: 'rgba(32, 32, 32, 0.8)',
        borderColor: 'rgba(32, 32, 32, 1)',
      },
    ],
  };
  const options = {
    legend: {
      labels: {
        fontColor: 'black',
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: 'black',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'black',
          },
        },
      ],
    },
  };

  return (
    <div className="component" id="linegraph">
      <h1>時系列</h1>
      <SelectMenu value={trainingid} handleChange={handleChangeSelect} />
      <Line data={data} options={options} />
    </div>
  );
};

export default LineGraph;
