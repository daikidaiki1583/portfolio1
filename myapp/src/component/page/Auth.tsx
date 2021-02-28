import React, { FC } from 'react';
import Login from '../templates/Login';
import Signin from '../templates/Signin';
import './Auth.scss';

const Auth: FC = () => (
  <>
    <p className="component">
      ユーザー登録して日々の筋トレの成果を記録し成長を実感しましょう。
      他ユーザーの筋トレ記録も見ることができます。
    </p>
    <div className="auth">
      <Login />
      <Signin />
    </div>
  </>
);

export default Auth;
