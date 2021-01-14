import React, { FC, useState, useMemo, useEffect } from 'react';
import calculateToday from '../../data/today';
import axios from '../../axios';
import './inputRecord.scss';

/* eslint-disable camelcase */
type data = {
  tr_id: number;
  menu: string;
};

const InputRecord: FC = () => {
  const today = useMemo(() => calculateToday(), []);
  const [trainingList, setTrainingList] = useState<data[]>([]);
  const [count, setCount] = useState<string>('');
  const [trainingid, setTrainingid] = useState<number>(1);
  const [date, setDate] = useState<string>(today);

  useEffect(() => {
    axios
      .get('/api/get/training')
      .then((response) => {
        setTrainingList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrainingid(parseInt(e.target.value, 10));
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    const userid = 1; // 動的に取得できるように修正する
    axios
      .post(`/api/insert/${userid}/`, {
        dt: date,
        trainingid,
        count,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));

    setCount('');
  };

  return (
    <form>
      <label htmlFor="menu">
        <div>メニュー</div>
        <select
          id="menu"
          value={trainingid}
          onChange={handleChangeSelect}
          required
        >
          {trainingList.map((training) => (
            <option value={training.tr_id} key={training.menu}>
              {training.menu}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="count">
        <div>回数</div>
        <input
          id="count"
          type="number"
          value={count}
          onChange={handleChangeInput}
          required
        />
      </label>

      <label htmlFor="date">
        <div>実施日</div>
        <input
          id="date"
          type="date"
          value={date}
          onChange={handleChangeDate}
          required
        />
      </label>
      <button type="button" onClick={handleSubmit}>
        登録
      </button>
    </form>
  );
};

export default InputRecord;
