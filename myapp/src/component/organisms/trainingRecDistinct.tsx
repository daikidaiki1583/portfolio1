import React, { FC, useEffect, useState } from 'react';
import axios from '../../axios';

type Datetype = {
  dt: Date;
};

const TrainingRecDistinct: FC = () => {
  const [recentlyDate, setRecentlyDate] = useState<Datetype[]>([]);

  useEffect(() => {
    axios
      .get(`/api/get/trainingrecord/distinct`)
      .then((result) => {
        setRecentlyDate(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {recentlyDate.map((rec) => (
        <div key={String(rec.dt)}>
          {String(new Date(rec.dt).getFullYear())}-
          {new Date(rec.dt).getMonth() + 1 < 10
            ? 0 + String(new Date(rec.dt).getMonth() + 1)
            : String(new Date(rec.dt).getMonth() + 1)}
          -
          {new Date(rec.dt).getDate() < 10
            ? 0 + String(new Date(rec.dt).getDate())
            : String(new Date(rec.dt).getDate())}
        </div>
      ))}
      <div>test</div>
    </>
  );
};

export default TrainingRecDistinct;
