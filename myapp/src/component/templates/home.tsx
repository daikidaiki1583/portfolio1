import React, { FC, useContext } from 'react';
import Graph from '../organisms/graph';
import { myContext } from '../../Context';

const Home: FC = () => {
  const ctx = useContext(myContext);
  console.log(ctx);
  return (
    <>
      <div>home</div>

      {/* <Graph /> */}
    </>
  );
};
export default Home;
