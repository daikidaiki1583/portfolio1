import React, { FC, useState, useEffect } from 'react';
import axios from '../../axios';
import TrainingItem from '../molecules/trainingItem';
import { data } from '../../type/type';
import './trainingList.scss';

type Props = {
  date: string;
};

const TrainingList: FC<Props> = ({ date }) => {
  const [trainingRecord, setTrainingRecord] = useState<data[]>([]);
  const [trainingMenu, setTrainingMenu] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get('/api/get/trainingrecord', {
        params: {
          dt: date,
        },
      })
      .then((response) => {
        setTrainingRecord(response.data);
        setTrainingMenu([]);
        response.data.map((tr: data) =>
          setTrainingMenu((state) => [...state, tr.menu]),
        );
      })
      .catch((err) => console.log(err));
  }, [date]);

  return (
    <>
      {trainingRecord.length ? (
        [...new Set(trainingMenu)].map((menu) => (
          <ul className="training-list" key={menu}>
            <h1>{menu}</h1>
            <TrainingItem menu={menu} record={trainingRecord} />
          </ul>
        ))
      ) : (
        <div>{`${date}は記録がありません。`}</div>
      )}
    </>
  );
};

export default TrainingList;
