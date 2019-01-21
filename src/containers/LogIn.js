import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Card, Button, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../actions/sessionActions';
import PropTypes from 'prop-types';
import * as _ from 'lodash'


class LogIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            internal_pending: false,
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.type]: event.target.value });
    }

    onSubmit = (event) => {
        this.props.sessionActions.requestSignIn(this.state.email, this.state.password)
        console.log('ONSUBMIT', this.state)
        this.setState({
            internal_pending: true
        })
    }

    renderSignInForm = () => {
        return (
            <div className="login-container">
                <Form>
                    <Form.Field>
                        <div className="login-form-label">Email</div>
                        <input placeholder='Email' type='email' onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">Password</div>
                        <input type='password' placeholder='Password' onChange={this.handleChange} />
                    </Form.Field>
                    <Button type='submit' onClick={this.onSubmit}>Log In</Button>
                </Form>
            </div>
        )
    }

    render() {
        const { internal_pending } = this.state
        const { session } = this.props
        if (!_.isEmpty(session.user)) {
            return <Redirect to='/' />
        } else if (internal_pending) {
            return "loading"
        }
        else {
            return (
                <div className="content-container">
                    {this.renderSignInForm()}
                </div>
            )
        }
    }
}

LogIn.propTypes = {
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
)(LogIn);