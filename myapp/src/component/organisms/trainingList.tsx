import React, { FC, useState, useEffect } from 'react';
import axios from '../../axios';
import TrainingItem from '../molecules/trainingItem';
import { data } from '../../type/type';
import './trainingList.scss';

type Props = {
  date: string;
  mode: string;
};

type Menu = {
  menu: string;
  name?: string;
};

const TrainingList: FC<Props> = ({ date, mode }) => {
  const [trainingRecord, setTrainingRecord] = useState<data[]>([]);
  const [trainingMenu, setTrainingMenu] = useState<Menu[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const path =
    mode === 'user'
      ? `/api/get/trainingrecord/`
      : `/api/get/trainingrecord/alluser`;

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

        if (mode === 'user') {
          setTrainingMenu([]);
          response.data.map((training: data) =>
            setTrainingMenu((state) => [{ menu: training.menu }, ...state]),
          );
        } else if (mode === 'all') {
          setTrainingMenu([]);
          response.data.map((training: data) =>
            setTrainingMenu((state) => [
              { menu: training.menu, name: training.name },
              ...state,
            ]),
          );

          setUsers([]);
          response.data.map((training: data) =>
            setUsers((state) => [training.name, ...state]),
          );
        }
      })
      .catch((err) => console.log(err));
  }, [date, path, mode]);

  const deleteRecord = (id: number) => {
    axios.delete(`/api/delete/${id}`);
    const newRecord = trainingRecord.filter((rec) => rec.id !== id);
    setTrainingMenu([]);
    newRecord.map((training) =>
      setTrainingMenu((state) => [
        { menu: training.menu, name: training.name },
        ...state,
      ]),
    );
    setTrainingRecord(newRecord);
  };

  /* eslint-disable */
  return (
    <>
      {trainingRecord.length ? (
        mode === 'user' ? (
          [...new Set(trainingMenu.map((obj) => obj.menu))].map((trmenu) => (
            <ul className="training-list" key={trmenu}>
              <h2>{trmenu}</h2>
              <TrainingItem
                menu={trmenu}
                record={trainingRecord}
                handledelete={deleteRecord}
                mode="user"
              />
            </ul>
          ))
        ) : (
          <div className="alluser-list">
            {[...new Set(users)].map((user) => (
              <div className="user-record">
                <h1>{user}さんの筋トレ記録</h1>
                {[
                  ...new Set(
                    trainingMenu
                      .filter((trmenu) => trmenu.name === user)
                      .map((obj) => obj.menu),
                  ),
                ].map((menu) => (
                  <div key={menu}>
                    <h3>{menu}</h3>
                    <TrainingItem
                      menu={menu}
                      record={trainingRecord.filter((rec) => rec.name === user)}
                      handledelete={deleteRecord}
                      mode="all"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )
      ) : (
        <div>{`${date}は記録がありません。`}</div>
      )}
    </>
  );
};

export default TrainingList;
