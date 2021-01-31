import React, { FC, useEffect, useState } from 'react';
import Input from '../atoms/input';
import axios from '../../axios';

const SignIn: FC = () => {
  const [password, setPassword] = useState<string>('');
  const [username, setUserneme] = useState<string>('');

  useEffect(() => {
    axios
      .get('/api/getuser/', {
        withCredentials: true,
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'username') {
      setUserneme(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = (): void => {
    axios
      .post('/signin/', {
        password,
        username,
      })
      .then((response) => {
        switch (response.data.sqlState) {
          case '23000':
            console.log('そのユーザー名はすでに使用されています');
            // エラー内容を表示させてわかるようにする
            break;
          default:
        }
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
        サインイン
      </button>
    </form>
  );
};

export default SignIn;
