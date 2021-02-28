import React, { FC } from 'react';
import TrainingPeriod from '../molecules/TrainingPeriod';
import TrainingView from '../templates/trainingVIew';
import Piegraph from '../molecules/Piegraph';
import './Home.scss';

export const Home: FC = () => (
  <div className="home">
    <div className="trainingperiod">
      <TrainingPeriod />
    </div>
    <div>
      <Piegraph />
    </div>
    <div className="trainingview">
      <TrainingView mode="user" />
    </div>
  </div>
);

export default Home;
