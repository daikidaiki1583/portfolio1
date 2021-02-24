import React, { FC, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Input from '../atoms/input';
import axios from '../../axios';
import { myContext } from '../../context/Context';
import './SignIn.scss';

const SignIn: FC = () => {
  const [password, setPassword] = useState<string>('');
  const [username, setUserneme] = useState<string>('');
  const [used, setUsed] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsed(() => false);
    if (e.target.id === 'username') {
      setUserneme(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const history = useHistory();
  const { dispatch } = useContext(myContext);
  const handleSubmit = async () => {
    try {
      const res = await axios.post('/signin/', {
        password,
        username,
      });

      switch (res.data.sqlState) {
        case '23000':
          setUsed(() => true);
          break;
        default:
          await axios.post(
            '/login',
            { username, password },
            {
              withCredentials: true,
            },
          );
          dispatch({ type: 'login' });
          history.push('/');
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signin">
      <Helmet>
        <title>サインイン</title>
      </Helmet>

      <div className={`error ${used ? 'add' : ''}`}>
        そのユーザー名は既に使用されています。
      </div>
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

        <button
          type="button"
          disabled={!(password && username)}
          onClick={() => handleSubmit()}
        >
          ユーザー登録
        </button>
      </form>
    </div>
  );
};

export default SignIn;
