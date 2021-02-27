import React, { FC } from 'react';
import Login from '../templates/Login';
import Signin from '../templates/Signin';
import './Auth.scss';

const Auth: FC = () => (
  <div className="auth">
    <Login />
    <Signin />
  </div>
);

export default Auth;
