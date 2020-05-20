import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './nav'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import IfThen from './IfThen/IfThen';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path='/page1' component={IfThen} />
      </div>
    </Router>
  );
}

export default App;
