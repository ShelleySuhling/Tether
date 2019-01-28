import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { DatePicker, TimePicker } from 'antd';
import { Checkbox } from 'semantic-ui-react'

import moment from 'moment';

class EventForm extends Component {

    render() {
        let { onSubmit, handleChange, error, event, isLoading, toggleMandatory, submitText } = this.props
        return (
            <div>
                {error ? <Segment inverted color='red' tertiary>{error}</Segment> : null}
                <Form className={isLoading ? "loading" : null}>
                    <Form.Field>
                        <div className="login-form-label">Event Title</div>
                        <input placeholder='Title' name="title" value={event.title} onChange={(e) => { handleChange('title', e.target.value) }} />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">Location</div>
                        <input placeholder='Location' name="location" value={event.location} onChange={(e) => { handleChange('location', e.target.value) }} />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">Date</div>
                        <DatePicker
                            selected={event.date}
                            onChange={(date) => { handleChange("date", date) }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <div className="login-form-label">Start Time</div>
                        <TimePicker onChange={(time) => { handleChange("startTime", time) }}
                            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                            use12Hours format="h:mm a" />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">End Time</div>
                        <TimePicker onChange={(time) => { handleChange("endTime", time) }}
                            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                            use12Hours format="h:mm a" />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">is this Mandatory?</div>
                        <Checkbox toggle onChange={() => { toggleMandatory() }} name="mandatory" />
                    </Form.Field>

                    <Button type='submit' onClick={onSubmit}>{submitText}</Button>
                </Form>
            </div>
        )
    }
}

export default EventForm