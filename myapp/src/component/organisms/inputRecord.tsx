import React, { FC, useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import SelectMenu from '../atoms/selectMenu';
import Input from '../atoms/input';
import calculateToday from '../../data/today';
import axios from '../../axios';
import './inputRecord.scss';

const InputRecord: FC = () => {
  const today = useMemo(() => calculateToday(), []);
  const [count, setCount] = useState<string>('');
  const [trainingid, setTrainingid] = useState<number>(1);
  const [date, setInputDate] = useState<string>(today);
  const [isSend, setIsSend] = useState<boolean>(false);

  /* eslint-disable arrow-body-style */
  useEffect(() => {
    return () => {
      setIsSend(false);
    };
  }, []);
  /* eslint-enable arrow-body-style */

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTrainingid(parseInt(e.target.value, 10));
  };

  const handleSubmit = () => {
    axios
      .post(
        `/api/insert/`,
        {
          dt: date,
          trainingid,
          count,
        },
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setIsSend(true);
          setTimeout(() => setIsSend(false), 3000);
        }
      })
      .catch((err) => console.log(err));

    setCount('');
  };

  return (
    <div className="component">
      <Helmet>
        <title>記録する</title>
      </Helmet>
      <form>
        <SelectMenu value={trainingid} handleChange={handleChangeSelect} />

        <Input
          id="count"
          type="number"
          value={count}
          handleChange={handleChangeInput}
          placeholder="回数 "
        />

        <Input
          id="date"
          type="date"
          value={date}
          handleChange={handleChangeDate}
        />
        <button type="button" onClick={handleSubmit}>
          記録する
        </button>
        <div className={`success ${isSend ? 'add' : ''}`}>
          {isSend}
          記録に成功しました。
        </div>
      </form>
    </div>
  );
};

export default InputRecord;
