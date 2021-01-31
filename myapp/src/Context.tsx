import React, {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
} from 'react';
import axios from './axios';

/* eslint-disable */
export const myContext = createContext<any>({});
const Context = (props: PropsWithChildren<any>) => {
  const [user, setUser] = useState<any>('');

  useEffect(() => {
    axios
      .get('/api/getuser', {
        withCredentials: true,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <myContext.Provider value={1000}>{props.children}</myContext.Provider>;
};
export default Context;
