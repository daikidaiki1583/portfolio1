import { createSecureServer } from 'http2';
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
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return <myContext.Provider value={user}>{props.children}</myContext.Provider>;
};
export default Context;
