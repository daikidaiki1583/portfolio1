import React, { FC, useState } from 'react';
import './input.scss';

type Props = {
  type: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  placeholder?: string;
};

const Input: FC<Props> = ({ type, value, handleChange, id, placeholder }) => {
  const [visible, setVisible] = useState<boolean>(false);

  const shiftVisible = () => {
    setVisible((state) => !state);
  };
  /* eslint-disable no-nested-ternary */
  return (
    <label htmlFor={id}>
      <input
        type={type === 'password' ? (visible ? 'type' : type) : type}
        id={id}
        minLength={type === 'password' ? 6 : undefined}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required
      />
      {id === 'password' ? (
        visible ? (
          <div onClick={() => shiftVisible()} aria-hidden="true">
            <i className="fas fa-eye" />
          </div>
        ) : (
          <div onClick={() => shiftVisible()} aria-hidden="true">
            <i className="fas fa-eye-slash" />
          </div>
        )
      ) : null}
    </label>
  );
};

export default Input;
