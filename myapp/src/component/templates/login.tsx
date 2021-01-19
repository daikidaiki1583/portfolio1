import React, { FC, useState } from 'react';
import Input from '../atoms/input';

const SignIn: FC = () => {
  const [password, setPassword] = useState<string>('');
  const [username, setUserneme] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'username') {
      setUserneme(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  return (
    <form action="">
      <Input
        id="username"
        type="text"
        value={username}
        handleChange={handleChange}
        placeholder="ユーザーネーム"
      />
      <Input
        id="password"
        type="text"
        value={password}
        handleChange={handleChange}
        placeholder="パスワード"
      />
      <button type="button">サインイン</button>
    </form>
  );
};

export default SignIn;
