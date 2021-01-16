import React, { FC } from 'react';

type Props = {
  type: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
};

const Input: FC<Props> = ({ type, value, handleChange, id, placeholder }) => (
  <label htmlFor={id}>
    <input
      type={type}
      id={id}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      required
    />
  </label>
);

export default Input;
