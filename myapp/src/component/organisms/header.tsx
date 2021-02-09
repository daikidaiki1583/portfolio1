import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navi from '../molecules/navigation';
import './header.scss';

const Header: FC = () => (
  <header>
    <div className="title">
      <Link to="/">筋トレコード</Link>
    </div>

    <div className="navi">
      <Navi />
    </div>
  </header>
);

export default Header;
