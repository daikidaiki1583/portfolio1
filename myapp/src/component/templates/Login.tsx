import React, { FC, useState, useContext } from 'react';
import Input from '../atoms/input';
import axios from '../../axios';
import { myContext } from '../../Context';

const Login: FC = () => {
  const { dispatch } = useContext(myContext);

  const [userid, setUserId] = useState<number>();
  const [password, setPassword] = useState<string>('');
  const [username, setUserneme] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'username') {
      setUserneme(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const data = {
    username,
    password,
  };

  const handleSubmit = (): void => {
    axios
      .post('/login/', data, {
        withCredentials: true,
      })
      .then((response) => {
        setUserId(response.data[0].id);
        dispatch({ type: 'login' });
      })
      .catch((err) => {
        console.log(err);
      });

    setUserneme('');
    setPassword('');
  };

  // パスワード確認用フォーム追加 サーバーからレスポンスに応じてリダイレクト作成 passport.jsで認証作成
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
        type="password"
        value={password}
        handleChange={handleChange}
        placeholder="パスワード"
      />
      <button type="button" onClick={() => handleSubmit()}>
        ログイン
      </button>
      <div>{userid}</div>
    </form>
  );
};

export default Login;
