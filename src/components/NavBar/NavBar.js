import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, Dropdown } from 'semantic-ui-react'
import * as _ from 'lodash'


//This needs to be refactored, shouldn't be calling actions
class NavBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeItem: this.props.location,
      session: this.props.session,
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  renderDropDown = () => {
    const { activeItem } = this.state
    const { session } = this.props


    return (<Dropdown item icon='wrench'>
      <Dropdown.Menu>
        <Menu.Item as={NavLink} exact to='/edit_profile' name='Edit Profile' active={activeItem === 'editprofile'} onClick={this.handleItemClick} />
        {session.user.role === "master" ? <Menu.Item as={NavLink} exact to='/new_event' name='Create Event' active={activeItem === 'newevent'} onClick={this.handleItemClick} /> : null}
        <Menu.Item as={NavLink} exact to='/signout' name='Sign Out' active={activeItem === 'signout'} onClick={this.handleItemClick} />
      </Dropdown.Menu>
    </Dropdown>)
  }

  render() {
    const { activeItem } = this.state
    const { session } = this.props
    return (
      <div className="nav-container">
        <Menu pointing>
          <Menu.Menu position='right'>
            {!_.isEmpty(session.user) ? <Menu.Item as={NavLink} exact to='/events' name='Events' active={activeItem === 'events'} onClick={this.handleItemClick} /> : null}
            {!_.isEmpty(session.user) ? this.renderDropDown() : null}
            {_.isEmpty(session.user) ? <Menu.Item as={NavLink} exact to='/signup' name='Sign Up' active={activeItem === 'signup'} onClick={this.handleItemClick} /> : null}
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}

NavBar.propTypes = {
  sessionActions: PropTypes.object,
  session: PropTypes.object,
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