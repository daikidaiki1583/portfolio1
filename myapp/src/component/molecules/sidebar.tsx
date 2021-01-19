import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';

const Sidebar: FC = () => (
  <nav className="sidebar">
    <Link to="/trainingView" className="link">
      <i className="fas fa-chart-line" />
      <span>成果を見る</span>
    </Link>
    <Link to="/inputRecord" className="link">
      <i className="fas fa-pencil-alt" />
      <span>記録する</span>
    </Link>
    <Link to="/signin" className="link">
      <span>ユーザー登録</span>
    </Link>
  </nav>
);
export default Sidebar;
