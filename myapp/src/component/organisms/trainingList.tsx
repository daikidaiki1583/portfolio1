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
        response.data.map((training: data) =>
          setTrainingMenu((state) => [...state, training.menu]),
        );
      })
      .catch((err) => console.log(err));
  }, [date]);

  const deleteRecord = (id: number) => {
    axios.delete(`/api/delete/${id}`);
    const newRecord = trainingRecord.filter((rec) => rec.id !== id);
    setTrainingMenu([]);
    newRecord.map((training) =>
      setTrainingMenu((state) => [training.menu, ...state]),
    );
    setTrainingRecord(newRecord);
  };

  return (
    <>
      {trainingRecord.length ? (
        [...new Set(trainingMenu)].map((menu) => (
          <ul className="training-list" key={menu}>
            <h1>{menu}</h1>
            <TrainingItem
              menu={menu}
              record={trainingRecord}
              handledelete={deleteRecord}
            />
          </ul>
        ))
      ) : (
        <div>{`${date}は記録がありません。`}</div>
      )}
    </>
  );
};

export default TrainingList;
