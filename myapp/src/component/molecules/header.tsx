import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header: FC = () => (
  <header>
    <div className="title">
      <Link to="/">筋トレコード</Link>
    </div>
    <nav>
      <Link to="/traininglist">成果を見る</Link>
      <Link to="/inputRecord">記録する</Link>
    </nav>
  </header>
);

export default Header;
