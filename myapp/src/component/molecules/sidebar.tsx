import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.scss';

const Sidebar: FC = () => (
  <nav className="sidebar">
    <Link to="/signin" className="link">
      <i className="fas fa-user-alt" />
      <span>サインイン</span>
    </Link>
    <Link to="/login" className="link">
      <i className="fas fa-sign-in-alt" />
      <span>ログイン</span>
    </Link>

    <Link to="/trainingView" className="link">
      <i className="fas fa-chart-line" />
      <span>成果を見る</span>
    </Link>
    <Link to="/inputRecord" className="link">
      <i className="fas fa-pencil-alt" />
      <span>記録する</span>
    </Link>
  </nav>
);
export default Sidebar;