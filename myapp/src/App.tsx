import React, { FC, useContext } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Header from './component/organisms/header';
import Home from './component/templates/home';
import TrainingView from './component/templates/trainingVIew';
import InputRecord from './component/organisms/inputRecord';
import Login from './component/templates/Login';
import NotFound from './component/atoms/NotFound';
import { myContext } from './Context';
import Logout from './component/atoms/logout';

const App: FC = () => {
  const { user } = useContext(myContext);

  return (
    <div className="App">
      <Header />
      <div className="body">
        <div className="main">
          {user ? (
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/inputRecord">
                <InputRecord />
              </Route>

              <Route path="/trainingview">
                <TrainingView />
              </Route>

              <Route path="/logout">
                <Logout />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>

              <Route>
                <NotFound />
              </Route>
            </Switch>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
