import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import PropTypes from 'prop-types';
import * as _ from 'lodash'

import EmailPasswordForm from '../../components/Forms/EmailPasswordForm'


class SignUp extends Component {

    componentWillUnmount() {
        this.props.sessionActions.clearAuthErrors()
    }

    handleChange = (event) => {
        this.setState({ [event.target.type]: event.target.value });
    }

    onSubmit = (event) => {
        this.props.sessionActions.requestSignUp(this.state.email, this.state.password)
    }

    redirectToEvents = () => {
        return <Redirect to='/events' />
    }

    render() {
        const { session } = this.props
        if (!_.isEmpty(session.user)) {
            return this.redirectToEvents()
        } else {
            return (
                <div className="content-container">
                    <EmailPasswordForm onSubmit={this.onSubmit}
                        handleChange={this.handleChange}
                        confirmPassword={true}
                        error={session.error}
                        isLoading={session.pending_signup}
                        submitText="Sign Up" />
                </div>
            )
        }
    }
}

SignUp.propTypes = {
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
)(SignUp);