import React, { FC, useState, useEffect } from 'react';
import axios from '../../axios';
import TrainingPeriod from '../molecules/TrainingPeriod';
import TrainingView from '../templates/trainingVIew';
import Piegraph from '../molecules/Piegraph';
import LineGraph from '../molecules/LineGraph';
import './Home.scss';

export const Home: FC = () => {
  const [latestDay, setLatestDay] = useState<string>(``);
  useEffect(() => {
    axios
      .get('/api/get/trainingperiod/max', {
        withCredentials: true,
      })
      .then((res) => {
        setLatestDay(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home">
      <TrainingPeriod />
      <div className="body">
        <div className="graph">
          <Piegraph />
          <LineGraph />
        </div>
        <div className="record">
          <TrainingView mode="user" latestDay={latestDay} />
        </div>
      </div>
    </div>
  );
};

export default Home;
