import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';
import SelectMenu from '../atoms/selectMenu';
import axios from '../../axios';

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
        data: graphData,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  return (
    <div>
      <SelectMenu value={trainingid} handleChange={handleChangeSelect} />
      <Line data={data} />
    </div>
  );
};

export default LineGraph;
