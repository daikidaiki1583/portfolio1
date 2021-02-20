import React, { FC, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
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

  const setDate = (e: React.MouseEvent<HTMLButtonElement>): void => {
    switch (e.currentTarget.id) {
      case 'minus':
        setInputDate(dayjs(date).subtract(1, 'd').format('YYYY-MM-DD'));
        break;
      case 'plus':
        setInputDate(dayjs(date).add(1, 'd').format('YYYY-MM-DD'));
        break;
      default:
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputDate(e.target.value);
  };

  return (
    <div id="test" className="trainingview component">
      <Helmet>
        <title>トレーニング履歴</title>
      </Helmet>
      <h1>筋トレ記録</h1>
      <div className="date">
        <button
          type="button"
          className="minus"
          id="minus"
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void => setDate(e)}
        >
          ＜
        </button>
        <Input type="date" value={date} handleChange={handleChange} />

        <button
          type="button"
          className="plus"
          id="plus"
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void => setDate(e)}
        >
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
