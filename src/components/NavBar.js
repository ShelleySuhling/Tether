import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import * as firebaseAuth from '../firebase/auth'


class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeItem: 'this.props.location',
    }
  }


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { session } = this.props

    return (
      <Menu pointing>
        {session.user ? session.user.email : null}
        <Menu.Menu position='right'>
          <Menu.Item as={NavLink} exact to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item as={NavLink} exact to='/messages' name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
          <Menu.Item as={NavLink} exact to='/logout' name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
          <Menu.Item as={NavLink} exact to='/login' name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </Menu>
    )
  }
}

NavBar.propTypes = {
  sessionActions: PropTypes.object,
  session: PropTypes.object
}

function mapStateToProps(state) {
  return {
    session: state.session
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
)(withRouter(NavBar));