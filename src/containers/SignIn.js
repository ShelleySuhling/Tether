import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import PropTypes from 'prop-types';
import * as _ from 'lodash'
import EmailPasswordForm from '../components/EmailPasswordForm'


class SignIn extends Component {
    componentWillUnmount() {
        this.props.sessionActions.clearAuthErrors()
    }

    handleChange = (event) => {
        this.setState({ [event.target.type]: event.target.value });
    }

    onSubmit = () => {
        this.props.sessionActions.requestSignIn(this.state.email, this.state.password)
    }

    render() {
        const { session } = this.props
        if (!_.isEmpty(session.user)) {
            return <Redirect to='/' />
        } else if (session.pending_signin) {
            return "loading"
        }
        else {
            return (
                <div className="content-container">
                    <EmailPasswordForm onSubmit={this.onSubmit} handleChange={this.handleChange} confirmPassword={false} error={session.error} />
                </div>
            )
        }
    }
}

SignIn.propTypes = {
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
)(SignIn);