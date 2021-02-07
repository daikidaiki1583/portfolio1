import React, { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../axios';
import { myContext } from '../../Context';
import './navigation.scss';

const Navi: FC = () => {
  const { user, dispatch } = useContext(myContext);
  const history = useHistory();

  const logout = () => {
    axios('/logout', {
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        dispatch({ type: 'logout' });
        history.push('/logout');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <nav className="navigation">
      {user ? (
        <>
          <Link to="/trainingView" className="link">
            <i className="fas fa-chart-line" />
            <span>成果を見る</span>
          </Link>
          <Link to="/inputRecord" className="link">
            <i className="fas fa-pencil-alt" />
            <span>記録する</span>
          </Link>
          <Link to="/logout" className="link" onClick={logout}>
            <i className="fas fa-sign-out-alt" />
            <span>ログアウト</span>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login" className="link">
            <i className="fas fa-sign-in-alt" />
            <span>ログイン</span>
          </Link>
        </>
      )}
    </nav>
  );
};
export default Navi;
