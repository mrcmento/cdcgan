import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Footer from './components/Footer'
import Home from './components/Home'
import About from './components/About'
import Header from './components/Header'
import Impressum from './components/Impressum'

function App() {
  return (
      <Router>
          <Header/>
          <div className="box">
            <Switch>
                <Route exact path="/"><Redirect to="/home" /></Route>
                <Route path='/home' exact component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/impressum' component={Impressum}/>
            </Switch> 
            <Footer></Footer>
          </div>
      </Router>
  );
}

export default App;
