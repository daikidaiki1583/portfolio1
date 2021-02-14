import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navi from '../molecules/navigation';
import './header.scss';
import { myContext } from '../../context/Context';

const Header: FC = () => {
  const { checkHeight } = useContext(myContext);

  return (
    <header>
      <div className="title">
        <Link to="/">筋トレコード</Link>
      </div>

      <div className={checkHeight ? 'navi hide' : 'navi'}>
        <Navi />
      </div>
    </header>
  );
};

export default Header;
