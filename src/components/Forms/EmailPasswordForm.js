import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'

class EmailPasswordForm extends Component {

    render() {
        let { confirmPassword, onSubmit, handleChange, error, isLoading, submitText } = this.props
        return (
            <div className="form-container">
                {error ? <Segment inverted color='red' tertiary>{error}</Segment> : null}
                <Form className={isLoading ? "loading" : null}>
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

                    <div className="submit-item">
                        <Button type='submit' onClick={onSubmit}>{submitText}</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default EmailPasswordForm