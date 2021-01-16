import React, { FC, useState, useMemo } from 'react';
import calculateToday from '../../data/today';

const InputDate2: FC = () => {
  const today = useMemo(() => calculateToday(), []);
  const [date, setDate] = useState<string>(today);

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <form action="">
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
    </form>
  );
};

export default InputDate2;
