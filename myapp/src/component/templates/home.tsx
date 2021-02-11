import React, { FC, useContext } from 'react';
import SiginIn from './Signin';
import TraingVIew from './trainingVIew';
import './home.scss';
import { myContext } from '../../Context';

const Home: FC = () => {
  const { user } = useContext(myContext);

  return (
    <>
      {console.log(user)}
      {user ? (
        <TraingVIew mode="all" />
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
    </>
  );
};
export default Home;
