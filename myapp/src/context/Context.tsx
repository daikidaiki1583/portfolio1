import React, {
  useState,
  useEffect,
  useReducer,
  createContext,
  PropsWithChildren,
} from 'react';
import axios from '../axios';

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

type User = {
  uid?: number;
  name?: string;
};

/* eslint-disable */
export const myContext = createContext<any>({});
const Context = (props: PropsWithChildren<any>) => {
  const [user, setUser] = useState<User | null>(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pageHeight, setHeight] = useState<number>(0);
  const [checkHeight, setCheckHeight] = useState<boolean>(false);
  const value = { user, dispatch, checkHeight };

  useEffect(() => {
    setHeight(document.body.scrollHeight - document.body.offsetHeight);

    const measure = () => {
      if (window.scrollY === pageHeight) {
        setCheckHeight(true);
      } else {
        setCheckHeight(false);
      }
    };
    window.addEventListener('scroll', measure, true);
  }, [pageHeight, checkHeight]);

  useEffect(() => {
    axios
      .get('/api/getuser/', {
        withCredentials: true,
      })
      .then((res) => {
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
