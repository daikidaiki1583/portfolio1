import React, { FC, useState, useMemo } from 'react';
import TrainingList from '../organisms/trainingList';
import Input from '../atoms/input';
import calculateToday from '../../data/today';

const TrainingView: FC = () => {
  const today = useMemo(() => calculateToday(), []);
  const [date, setDate] = useState<string>(today);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDate(e.target.value);
  };

  return (
    <div>
      <h1>筋トレ記録</h1>
      <Input type="date" value={date} handleChange={handleChange} />
      <TrainingList date={date} />
    </div>
  );
};

export default TrainingView;
