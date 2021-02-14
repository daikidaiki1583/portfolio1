import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './logout.scss';

const Logout: FC = () => (
  <div className="logout component">
    <Helmet>
      <title>ログアウト</title>
    </Helmet>
    <h1>筋トレお疲れさまでした</h1>
    <button type="button">
      <Link to="/">ホームに戻る</Link>
    </button>
  </div>
);

export default Logout;
