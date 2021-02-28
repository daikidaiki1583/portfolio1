import React, { FC, useState, useEffect } from 'react';
import axios from '../../axios';
import './selectMenu.scss';

/* eslint-disable camelcase */
type data = {
  tr_id: number;
  menu: string;
};

type Props = {
  value: number;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectMenu: FC<Props> = ({ value, handleChange }) => {
  const [trainingList, setTrainingList] = useState<data[]>([]);

  useEffect(() => {
    axios
      .get('/api/get/training')
      .then((response) => {
        setTrainingList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <label htmlFor="menu">
      <select id="menu" value={value} onChange={handleChange} required>
        {trainingList.map((training) => (
          <option value={training.tr_id} key={training.menu}>
            {training.menu}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectMenu;
