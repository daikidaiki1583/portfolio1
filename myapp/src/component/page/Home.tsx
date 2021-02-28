import React, { FC } from 'react';
import TrainingPeriod from '../molecules/TrainingPeriod';
import TrainingView from '../templates/trainingVIew';
import Piegraph from '../molecules/Piegraph';
import LineGraph from '../molecules/LineGraph';
import './Home.scss';

export const Home: FC = () => (
  <div className="home">
    <TrainingPeriod />
    <div className="body">
      <div className="graph">
        <Piegraph />
        <LineGraph />
      </div>
      <div className="record">
        <TrainingView mode="user" />
      </div>
    </div>
  </div>
);

export default Home;
