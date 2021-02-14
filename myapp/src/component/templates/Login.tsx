import React, { FC, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../atoms/input';
import axios from '../../axios';
import { myContext } from '../../context/Context';
import './Login.scss';

const Login: FC = () => {
  const { dispatch } = useContext(myContext);
  const history = useHistory();

  const [username, setUserneme] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    switch (e.target.id) {
      case 'username':
        setUserneme(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      default:
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
      .then(() => {
        dispatch({ type: 'login' });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });

    setUserneme('');
    setPassword('');
  };

  // パスワード確認用フォーム追加 サーバーからレスポンスに応じてリダイレクト作成 passport.jsで認証作成
  return (
    <div className="component">
      <h1>さぁ、筋トレの時間だ</h1>
      <form action="">
        <div className="username">
          <Input
            id="username"
            type="text"
            value={username}
            handleChange={handleChange}
            placeholder="ユーザーネーム"
          />
        </div>
        <div className="password">
          <Input
            id="password"
            type="password"
            value={password}
            handleChange={handleChange}
            placeholder="パスワード"
          />
        </div>
        <button
          type="button"
          disabled={!(password && username)}
          onClick={() => handleSubmit()}
        >
          ログイン
        </button>
      </form>
    </div>
  );
};

export default Login;
