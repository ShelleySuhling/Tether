import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as sessionActions from '../actions/sessionActions';
import ProfileForm from '../components/ProfileForm'


class EditProfile extends Component {
    componentWillUnmount() {
        this.props.sessionActions.clearAuthErrors()
    }

    handleChange = (event) => {
        this.setState({ [event.target.type]: event.target.value });
    }

    onSubmit = () => {
        // this.props.sessionActions.requestSignIn(this.state.email, this.state.password)
    }

    render() {
        const { session } = this.props
        return <ProfileForm handleChange={this.handleChange} onSubmit={this.onSubmit} user={session.user}></ProfileForm>
    }
}

EditProfile.propTypes = {
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
)(EditProfile);