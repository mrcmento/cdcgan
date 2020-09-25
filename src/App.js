import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Header from './components/Header'

function App() {
  return (
      <Router>
          <Header/>
          <div className="box">
            <Switch>
                <Route exact path="/"><Redirect to="/home" /></Route>
                <Route path='/home' exact component={Home}/>
                <Route path='/about' component={About}/>
            </Switch> 
          </div>
      </Router>
  );
}

export default App;
