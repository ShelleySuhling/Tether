import React, { Component } from 'react';
import { Route, Router, NavLink, HashRouter, BrowserRouter, withRouter, Switch } from "react-router-dom";
import './assets/css/App.css';
import NavBar from './components/NavBar'
import Home from './containers/Home'
import Messages from './containers/Messages'
import LogIn from './containers/LogIn'
import LogOut from './containers/LogOut'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar />
            <Route exact path='/' component={Home} />
            <Route path='/messages' component={Messages} />
            <Route path='/login' component={LogIn} />
            <Route path='/logout' component={LogOut} />

          </div>
        </BrowserRouter>
      </div>)
  }
}

export default App;
