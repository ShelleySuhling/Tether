import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import './assets/css/App.css';
import * as sessionActions from './actions/sessionActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavBar from './components/NavBar'
import Home from './containers/Home'
import SignIn from './containers/SignIn'
import SignOut from './containers/SignOut'
import SignUp from './containers/SignUp'
import EditProfile from './containers/EditProfile'
import Events from './containers/Events'
import NewEvent from './containers/NewEvent'
import EditEvent from './containers/EditEvent'



class App extends Component {

  ProtectedRoute = ({ component: Component, ...rest }) => {
    const { session } = this.props
    return (<Route {...rest} render={(props) => (
      session.isAuthenticated ?
        <Component {...props} /> : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
    )} />)
  }

  AdminRoute = ({ component: Component, ...rest }) => {
    const { session } = this.props
    return (<Route {...rest} render={(props) => (
      (session.user.role === "master") ?
        <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />)
  }

  render() {
    const { session } = this.props
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar isAuthenticated={session.isAuthenticated} />
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            {this.ProtectedRoute({ path: '/events', component: Events })}
            {this.ProtectedRoute({ path: '/signout', component: SignOut })}
            {this.ProtectedRoute({ path: '/edit_profile', component: EditProfile })}
            {this.AdminRoute({ path: '/new_event', component: NewEvent })}
            {this.AdminRoute({ path: '/edit_event/:id', component: EditEvent })}
          </div>
        </BrowserRouter>
      </div>)
  }
}


App.propTypes = {
  sessionActions: PropTypes.object,
  session: PropTypes.object
};
function mapStateToProps(state) {
  return {
    session: state.session,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    sessionActions: bindActionCreators(sessionActions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);