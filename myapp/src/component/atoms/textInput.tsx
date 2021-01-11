import React, { FC, useState } from 'react';

type Props = {
  id: string;
  label: string;
  type: string;
  defaultValue: string | ReadonlyArray<string> | number;
};

const TextInput: FC<Props> = ({ id, type, defaultValue }) => {
  const [input, setInput] = useState<string | ReadonlyArray<string> | number>(
    defaultValue,
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <input id={id} type={type} value={input} onChange={handleChangeInput} />
    </>
  );
};

export default TextInput;
