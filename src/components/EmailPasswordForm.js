import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'

class EmailPasswordForm extends Component {

    render() {
        let { confirmPassword, onSubmit, handleChange, error } = this.props
        return (
            <div className="login-container">
                {error ? <Segment inverted color='red' tertiary>{error}</Segment> : null}
                <Form>
                    <Form.Field>
                        <div className="login-form-label">Email</div>
                        <input placeholder='Email' type='email' onChange={handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">Password</div>
                        <input type='password' placeholder='Password' onChange={handleChange} />
                    </Form.Field>

                    {confirmPassword
                        ? <Form.Field>
                            <div className="login-form-label">Confirm Password</div>
                            <input type='password' placeholder='Password' onChange={handleChange} />
                        </Form.Field>
                        : null}

                    <Button type='submit' onClick={onSubmit}>Log In</Button>
                </Form>
            </div>
        )
    }
}

export default EmailPasswordForm