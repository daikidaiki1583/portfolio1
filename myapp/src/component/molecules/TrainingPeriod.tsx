import React, { FC, useState, useEffect, useMemo } from 'react';
import dayjs from 'dayjs';
import axios from '../../axios';
import calculateToday from '../../data/today';
import './TrainingPeriod.scss';

const TrainingPeriod: FC = () => {
  const [countTraining, setcountTraining] = useState<number>(0);
  const [passedDay, setPassedDay] = useState<number>(0);
  const today = useMemo(() => calculateToday(), []);

  useEffect(() => {
    axios
      .get('/api/get/counttraining', {
        withCredentials: true,
      })
      .then((res) => {
        setcountTraining(res.data[0]['count(distinct dt)']);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    axios
      .get('/api/get/trainingperiod', {
        withCredentials: true,
      })
      .then((res) => {
        setPassedDay(dayjs(today).diff(dayjs(res.data[0]['MIN(dt)']), 'day'));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="component training-data">
      <div className="data">
        <strong>{countTraining}</strong> 日筋トレしています。
      </div>

      <div className="data">
        <strong>{Math.round((passedDay / countTraining) * 10) / 10}</strong>{' '}
        日に1度筋トレしています。
      </div>
    </div>
  );
};

export default TrainingPeriod;
