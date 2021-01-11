import React, { FC } from 'react';
import TrainingItem from '../molecules/trainingItem';
import './trainingList.scss';

const TrainingList: FC = () => {
  const trainingMenu = [
    { name: '腕立て', id: 1 },
    { name: '腹筋', id: 2 },
  ];
  return (
    <>
      {trainingMenu.map((menu) => (
        <ul className="training-list" key={menu.id}>
          <h1>{menu.name}</h1>
          <TrainingItem menu={menu.name} />
        </ul>
      ))}
    </>
  );
};

export default TrainingList;
