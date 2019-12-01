import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ReactDOM from 'react-dom';
import Profile from './Profile';
import Inventory from './Inventory';
import Recipes from './Recipes';
import AddMeal from './AddMeal';
import LoginForm from './LoginForm';
import 'react-circular-progressbar/dist/styles.css'; 
import './index.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/"><Profile/></Route>
      <Route exact path="/inventory"><Inventory/></Route>
      <Route exact path="/recipes"><Recipes/></Route>
      <Route exact path="/addmeal"><AddMeal/></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
