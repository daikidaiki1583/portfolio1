import React, { FC, useState, useMemo } from 'react';
import TrainingList from '../organisms/trainingList';
import Input from '../atoms/input';
import calculateToday from '../../data/today';
import './trainingView.scss';

type Props = {
  mode: string;
};

const TrainingView: FC<Props> = ({ mode }) => {
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
        <button type="button" className="minus">
          ＜
        </button>
        <Input type="date" value={date} handleChange={handleChange} />

        <button type="button" className="plus">
          ＞
        </button>
      </div>
      {mode === 'user' ? (
        <TrainingList date={date} mode="user" />
      ) : (
        <TrainingList date={date} mode="all" />
      )}
    </div>
  );
};

export default TrainingView;
