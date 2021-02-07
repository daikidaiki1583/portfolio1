import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const NotFound: FC = () => (
  <div className="component">
    <div>ページが見つかりません</div>
    <Link to="/">ホームへ</Link>
  </div>
);
export default NotFound;
