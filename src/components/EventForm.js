import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { DatePicker, TimePicker } from 'antd';
import { Checkbox } from 'semantic-ui-react'
import FormErrors from './FormErrors'
import moment from 'moment';

class EventForm extends Component {
    constructor(props) {
        super(props)
        this.state = this.props.event ? {
            ...this.props.event,
            start_time: new moment().hours(moment(this.props.event.startTime).hours()),
            end_time: new moment().hours(moment(this.props.event.endTime).hours()),
            date: new moment().date(moment(this.props.event.startTime).date()),
            errors: []
        } : {
                title: '',
                location: '',
                start_time: new moment(),
                end_time: new moment(),
                date: new moment(),
                isMandatory: false,
                isValid: false,
                errors: []
            }
    }

    handleChange = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        });
    }

    validateState = () => {
        //https://i.imgur.com/QGqncla.gifv

        let { title, location, start_time, end_time, date, isMandatory } = this.state
        let errors = []
        if (!title || title.length <= 5) {
            errors.push("Title must be longer than 5 characters.")
        }
        if (!location || location.length <= 5) {
            errors.push("Location must be longer than 5 characters.")
        }
        if (!start_time || moment(date).hours(start_time).isBefore(moment())) {
            errors.push("Start must be in future")
        }
        if (!end_time || moment(date).hours(end_time).isBefore(moment())) {
            errors.push("End must be in future")
        }
        if (!date || moment(date).isBefore(moment())) {
            errors.push("Date must be in future")
        }

        this.setState({
            ...this.state,
            errors: errors
        })
        return errors
    }

    toggleMandatory = () => {
        this.setState({
            isMandatory: !this.state.isMandatory
        })
    }

    onSubmit = () => {
        if (this.validateState() == 0) {
            this.props.onSubmit(this.state)
        } else {
            window.scrollTo(0, 0)
        }
    }

    render() {
        let { isLoading, submitText } = this.props
        let event = this.state

        return (
            <div>
                <FormErrors errors={this.state.errors} />
                <Form className={isLoading ? "loading" : null}>
                    <Form.Field>
                        <div className="login-form-label">Event Title</div>
                        <input placeholder='Title'
                            name="title" value={event.title}
                            onChange={(e) => { this.handleChange('title', e.target.value) }} />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">Location</div>
                        <input placeholder='Location'
                            name="location" value={event.location}
                            onChange={(e) => { this.handleChange('location', e.target.value) }} />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">Date</div>
                        <DatePicker
                            defaultValue={this.state.date}
                            selected={event.date}
                            onChange={(date) => { this.handleChange("date", date) }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <div className="login-form-label">Start Time</div>
                        <TimePicker onChange={(time) => { this.handleChange("start_time", time) }}
                            defaultValue={this.state.start_time}
                            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                            use12Hours format="h:mm a" />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">End Time</div>
                        <TimePicker onChange={(time) => { this.handleChange("end_time", time) }}
                            defaultValue={this.state.end_time}
                            defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
                            use12Hours format="h:mm a" />
                    </Form.Field>
                    <Form.Field>
                        <div className="login-form-label">is this Mandatory?</div>
                        <Checkbox toggle defaultChecked={event.isMandatory}
                            onChange={() => { this.toggleMandatory() }}
                            name="mandatory" />
                    </Form.Field>

                    <Button type='submit' onClick={this.onSubmit}>{submitText}</Button>
                </Form>
            </div>
        )
    }
}

export default EventForm