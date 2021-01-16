import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header: FC = () => (
  <header>
    <div className="title">
      <Link to="/">筋トレコード</Link>
    </div>
  </header>
);

export default Header;
