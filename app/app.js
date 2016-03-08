import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Redirect } from 'react-router';

import CharactersList from './components/CharactersList';
import CharacterInfo from './components/CharacterInfo';

ReactDOM.render (
  <Router>
    <Redirect from='/' to='/characters' />
    <Route path='/characters' component={CharactersList} />
    <Route path='/character' component={CharacterInfo} />
  </Router>, document.getElementById('app')
);
