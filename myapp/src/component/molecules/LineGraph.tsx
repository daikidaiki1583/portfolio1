import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';
import SelectMenu from '../atoms/selectMenu';
import axios from '../../axios';
import './LineGraph.scss';

const LineGraph: FC = () => {
  const [trainingid, setTrainingid] = useState<number>(1);
  const [graphLabel, setLabel] = useState<string[]>([]);
  const [graphData, setData] = useState<number[]>([]);
  const [BorderColor, setBorderColor] = useState<string>(
    'rgba(255, 99, 132, 0.8)',
  );
  const [BackGroundColor, setBackGroundColor] = useState<string>(
    'rgba(255, 99, 132, 1)',
  );

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

  useEffect(() => {
    switch (trainingid) {
      case 1:
        setBackGroundColor('rgba(255, 99, 132, 0.8)');
        setBorderColor('rgba(255, 99, 132, 1)');
        break;
      case 2:
        setBackGroundColor('rgba(54, 162, 235, 0.8)');
        setBorderColor('rgba(54, 162, 235, 1)');
        break;
      case 3:
        setBackGroundColor('rgba(255, 206, 86, 0.8)');
        setBorderColor('rgba(255, 206, 86, 1)');
        break;
      case 4:
        setBackGroundColor('rgba(75, 192, 192, 0.8)');
        setBorderColor('rgba(75, 192, 192, 1)');
        break;
      default:
    }
  }, [trainingid]);

  const data = {
    labels: graphLabel,
    datasets: [
      {
        label: '回数',
        fill: false,
        data: graphData,
        backgroundColor: BackGroundColor,
        borderColor: BorderColor,
      },
    ],
  };

  return (
    <div className="component" id="linegraph">
      <h1>時系列</h1>
      <SelectMenu value={trainingid} handleChange={handleChangeSelect} />
      <Line data={data} />
    </div>
  );
};

export default LineGraph;
