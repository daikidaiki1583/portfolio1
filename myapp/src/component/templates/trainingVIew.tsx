import React, { FC, useState, useMemo } from 'react';
import TrainingList from '../organisms/trainingList';
import Input from '../atoms/input';
import calculateToday from '../../data/today';
import './trainingView.scss';

const TrainingView: FC = () => {
  const today = useMemo(() => calculateToday(), []);
  const [date, setInputDate] = useState<string>(today);
  // const [date, setInputDate] = useState<string>(today);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputDate(e.target.value);
  };

  return (
    <div className="trainingview component">
      <h1>筋トレ記録</h1>
      <div className="date">
        <button
          type="button"
          className="minus"
          // onClick={() =>
          //   setInputDate(
          //     (state) => `2021-01-0${String(new Date(state).getDate() - 1)}`,
          //     // String(new Date(state).setDate(new Date(state).getDate() - 1)),
          //   )
          // }
        >
          ＜
        </button>
        <Input type="date" value={date} handleChange={handleChange} />

        {/* <Input type="date" value={date} handleChange={handleChange} /> */}

        <button type="button" className="plus">
          ＞
        </button>
      </div>
      <TrainingList date={date} mode="user" />
    </div>
  );
};

export default TrainingView;
