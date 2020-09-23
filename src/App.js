import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Home from './components/Home'
import About from './components/About'
import Header from './components/Header'
import Background from './components/Background'

function App() {
  return (
    <div>
        <Router>
            <div>
              <Background></Background>
              <div className="front">
                <Header/> 
                  <Switch>
                      <Route exact path="/"><Redirect to="/home" /></Route>
                      <Route path='/home' exact component={Home}/>
                      <Route path='/about' component={About}/>
                  </Switch> 
              </div>
            </div>
        </Router>
    </div>
  );
}

export default App;
