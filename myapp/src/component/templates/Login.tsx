import React, { FC, useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
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
  const [isError, setError] = useState<boolean>(false);

  /* eslint-disable arrow-body-style */
  useEffect(() => {
    return () => {
      setError(() => false);
    };
  }, []);
  /* eslint-enable arrow-body-style */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setError(() => false);
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

  const user = {
    username,
    password,
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const loginInfo =
      e.currentTarget.id === 'user'
        ? user
        : { username: 'ゲスト', password: 'guestuser' };

    console.log(loginInfo);

    axios
      .post('/login/', loginInfo, {
        withCredentials: true,
      })
      .then(() => {
        dispatch({ type: 'login' });
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        setError(() => true);
      });

    setUserneme('');
    setPassword('');
  };

  return (
    <div className="login component">
      <Helmet>
        <title>ログイン</title>
      </Helmet>

      <h1>ログイン</h1>
      <div className={`error ${isError ? 'add' : ''}`}>
        ユーザー名かパスワードが異なります
      </div>
      <form className="login-form" action="">
        <div className="username">
          <Input
            id="username"
            type="text"
            value={username}
            handleChange={handleChange}
            placeholder="ユーザー名"
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
          id="user"
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void =>
            handleSubmit(e)
          }
        >
          ログイン
        </button>
        <button
          type="button"
          className="guest"
          id="guestuser"
          onClick={(e: React.MouseEvent<HTMLButtonElement>): void =>
            handleSubmit(e)
          }
        >
          ゲストユーザーでログイン
        </button>
      </form>
    </div>
  );
};

export default Login;
