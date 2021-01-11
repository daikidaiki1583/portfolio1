import React, { FC, useState, useMemo } from 'react';
import calculateToday from '../../data/today';
import './inputRecord.scss';

const InputRecord: FC = () => {
  const today = useMemo(() => calculateToday(), []);
  const [input, setInput] = useState<string>('');
  const [option, setOption] = useState<string>('腕立て');
  const [date, setDate] = useState<string>(today);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOption(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    setInput('');
  };

  return (
    <form>
      <label htmlFor="menu">
        <div>メニュー</div>
        <select id="menu" value={option} onChange={handleChangeSelect}>
          <option value="腕立て">腕立て</option>
          <option value="腹筋">腹筋</option>
          <option value="スクワット">スクワット</option>
        </select>
      </label>

      <label htmlFor="count">
        <div>回数</div>
        <input
          id="count"
          type="number"
          value={input}
          onChange={handleChangeInput}
        />
      </label>

      <label htmlFor="date">
        <div>実施日</div>
        <input id="date" type="date" value={date} onChange={handleChangeDate} />
      </label>
      <button type="button" onClick={handleSubmit}>
        登録
      </button>
    </form>
  );
};

export default InputRecord;
