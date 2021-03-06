import React, { FC, useContext } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Header from './component/organisms/header';
import TrainingView from './component/templates/trainingVIew';
import InputRecord from './component/organisms/inputRecord';
import NotFound from './component/atoms/NotFound';
import { myContext } from './context/Context';
import Logout from './component/atoms/logout';
import Auth from './component/page/Auth';
import Home from './component/page/Home';

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
                <TrainingView mode="all" />
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
              <Route path="/">
                <Auth />
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
