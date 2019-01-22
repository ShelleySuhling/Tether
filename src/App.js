import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import './assets/css/App.css';
import * as sessionActions from './actions/sessionActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavBar from './components/NavBar'
import Home from './containers/Home'
import Messages from './containers/Messages'
import SignIn from './containers/SignIn'
import SignOut from './containers/SignOut'
import EditProfile from './containers/EditProfile'


class App extends Component {
  constructor(props) {
    super(props)
  }

  ProtectedRoute = ({ component: Component, ...rest }) => {
    const { session } = this.props
    console.log(session)
    return (<Route {...rest} render={(props) => (
      session.isAuthenticated ?
        <Component {...props} /> : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
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
            <Route path='/signout' component={SignOut} />
            <Route path='/edit_profile' component={EditProfile} />
            {/* {this.ProtectedRoute({ component: EditProfile })} */}
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