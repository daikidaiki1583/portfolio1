import React, { FC } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './component/molecules/header';
import Home from './component/templates/home';
import TrainingList from './component/organisms/trainingList';
import InputRecord from './component/organisms/inputRecord';

const App: FC = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/inputRecord">
        <InputRecord />
      </Route>
      <Route path="/traininglist">
        <TrainingList />
      </Route>
    </Switch>
  </div>
);

export default App;
