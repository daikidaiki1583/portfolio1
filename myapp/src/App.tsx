import React, { FC } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import Header from './component/molecules/header';
import Home from './component/templates/home';
import Sidebar from './component/molecules/sidebar';
import TrainingView from './component/templates/trainingVIew';
import InputRecord from './component/organisms/inputRecord';
import Login from './component/templates/login';

const App: FC = () => (
  <div className="App">
    <Header />
    <div className="body">
      <div className="side">
        <Sidebar />
      </div>
      <div className="main">
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
          <Route path="/signin">
            <Login />
          </Route>
        </Switch>
      </div>
    </div>
  </div>
);

export default App;
