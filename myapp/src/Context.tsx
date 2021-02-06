import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  PropsWithChildren,
} from 'react';
import axios from './axios';

const initialState = false;
type Action = {
  type: string;
};

const reducer = (state: boolean, action: Action) => {
  switch (action.type) {
    case 'login':
      return true;
    case 'logout':
      return false;
    default:
      throw new Error();
  }
};

/* eslint-disable */
export const myContext = createContext<any>({});
const Context = (props: PropsWithChildren<any>) => {
  const [user, setUser] = useState<any>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { user, dispatch };

  useEffect(() => {
    axios
      .get('/api/getuser/', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  return (
    <myContext.Provider value={value}>{props.children}</myContext.Provider>
  );
};
export default Context;
