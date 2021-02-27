import React, { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../axios';
import { myContext } from '../../context/Context';
import './navigation.scss';

const Navi: FC = () => {
  const { user, dispatch } = useContext(myContext);
  const history = useHistory();

  const logout = () => {
    axios('/logout', {
      withCredentials: true,
    })
      .then(async () => {
        await dispatch({ type: 'logout' });
      })
      .then(() => {
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
          {/* <div className="link">{user.name}</div> */}
        </>
      ) : (
        <></>
      )}
    </nav>
  );
};
export default Navi;
