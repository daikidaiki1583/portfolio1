import React, { FC, useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navi from '../molecules/navigation';
import './header.scss';

const Header: FC = () => {

  const [pageHeight, setHeight] = useState<number>(0);
  const [checkHeight, setCheckHeight] = useState<boolean>(false);
  console.log(checkHeight)
  useEffect(() => {
    setHeight(document.body.scrollHeight - document.body.offsetHeight);

    const measure = () => {
      if (window.scrollY === pageHeight) {
        setCheckHeight(true);
      } else {
        setCheckHeight(false);
      }
    };
    window.addEventListener('scroll', measure, true);
  }, [pageHeight, checkHeight]);
  
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
