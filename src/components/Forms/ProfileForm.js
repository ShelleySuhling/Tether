import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'

class ProfileForm extends Component {

    render() {
        let { onSubmit, handleChange, error, user, isLoading } = this.props
        return (
            <div className="form-container">
                {error ? <Segment inverted color='red' tertiary>{error}</Segment> : null}
                <Form className={isLoading ? "loading" : null}>
                    <Form.Field>
                        <div className="login-form-label">Email</div>
                        <input placeholder='Email' name="email" value={user.email} type='email' onChange={handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">Full Name</div>
                        <input placeholder='Full Name' name="fullName" value={user.fullName} onChange={handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">Phone Number</div>
                        <input placeholder='Phone Number' name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
                    </Form.Field>
                    <div className="submit-item">
                        <Button type='submit' onClick={onSubmit}>Update</Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default ProfileForm
