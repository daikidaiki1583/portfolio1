import React, { FC, useContext } from 'react';
import SiginIn from './Signin';
import './home.scss';
import { myContext } from '../../Context';

const Home: FC = () => {
  const user = useContext(myContext);

  return (
    <div className="component">
      {user ? (
        <div>ログイン状態</div>
      ) : (
        <div className="home component">
          <p>
            ユーザー登録をすると、日々の筋トレを記録できたり、他のユーザーの筋トレ記録が見えます。
            <br />
            <br />
            レッツ筋トレコード！
          </p>

          <SiginIn />
        </div>
      )}
    </div>
  );
};
export default Home;
