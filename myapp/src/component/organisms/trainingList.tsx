import React, { FC, useState, useEffect } from 'react';
import axios from '../../axios';
import TrainingItem from '../molecules/trainingItem';
import { data } from '../../type/type';
import './trainingList.scss';

type Props = {
  date: string;
  mode: string;
};

const TrainingList: FC<Props> = ({ date, mode }) => {
  const [trainingRecord, setTrainingRecord] = useState<data[]>([]);
  const [trainingMenu, setTrainingMenu] = useState<string[]>([]);
  const path =
    mode === 'user'
      ? `/api/get/trainingrecord/`
      : `/api/get/trainingrecord/all`;

  useEffect(() => {
    axios
      .get(path, {
        withCredentials: true,
        params: {
          dt: date,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTrainingRecord(response.data);
        setTrainingMenu([]);
        response.data.map((training: data) =>
          setTrainingMenu((state) => [training.menu, ...state]),
        );
      })
      .catch((err) => console.log(err));
  }, [date, path]);

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
            <h2>{menu}</h2>
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
