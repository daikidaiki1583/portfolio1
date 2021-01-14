import React, { FC, useState, useEffect, useMemo } from 'react';
import axios from '../../axios';
import TrainingItem from '../molecules/trainingItem';
import { data } from '../../type/type';
import './trainingList.scss';
import calculateToday from '../../data/today';

const TrainingList: FC = () => {
  const today = useMemo(() => calculateToday(), []);
  const [trainingRecord, setTrainingRecord] = useState<data[]>([]);
  const [trainingMenu, setTrainingMenu] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get('/api/get/trainingrecord', {
        params: {
          dt: today,
        },
      })
      .then((response) => {
        setTrainingRecord(response.data);
        response.data.map((tr: data) =>
          setTrainingMenu((state) => [...state, tr.menu]),
        );
      })
      .catch((err) => console.log(err));
  }, [today]);

  return (
    <>
      {[...new Set(trainingMenu)].map((menu) => (
        <ul className="training-list" key={menu}>
          <h1>{menu}</h1>
          <TrainingItem menu={menu} record={trainingRecord} />
        </ul>
      ))}
    </>
  );
};

export default TrainingList;
