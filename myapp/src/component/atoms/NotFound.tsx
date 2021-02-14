import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NotFound: FC = () => (
  <div className="component">
    <Helmet>
      <title>ページが見つかりません</title>
    </Helmet>
    <div>ページが見つかりません</div>
    <Link to="/">ホームへ</Link>
  </div>
);
export default NotFound;
