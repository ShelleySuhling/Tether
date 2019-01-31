import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../actions/eventsActions';
import PropTypes from 'prop-types';
import EventForm from '../components/EventForm'
import { Redirect } from 'react-router-dom'
import * as _ from 'lodash'
import moment from 'moment'
import FormErrors from '../components/FormErrors'



class NewEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            location: '',
            startTime: null,
            endTime: null,
            date: null,
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
        let { title, location, startTime, endTime, date, isMandatory } = this.state
        let errors = []
        if (!title || title.length <= 5) {
            errors.push("Title must be longer than 5 characters.")
        }
        if (!location || location.length <= 5) {
            errors.push("Location must be longer than 5 characters.")
        }
        if (!startTime || moment(date).hours(startTime).isBefore(moment())) {
            errors.push("Start must be in future")
        }
        if (!endTime || moment(date).hours(endTime).isBefore(moment())) {
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
        console.log('****', this.validateState())
        if (this.validateState() == 0) {
            this.props.eventsActions.requestCreateEvent(this.state)
        } else {
            window.scrollTo(0, 0)
        }
    }

    render() {
        let { events } = this.props
        console.log(this.state)
        if (events.newEvent) {
            return <Redirect to='/events' />
        } else {
            return (
                <div className="content-container">
                    <FormErrors errors={this.state.errors} />
                    <EventForm event={this.state}
                        handleChange={this.handleChange}
                        toggleMandatory={this.toggleMandatory}
                        onSubmit={this.onSubmit}
                        submitText="Create Event" />
                </div >)
        }
    }
}

NewEvent.propTypes = {
    eventsActions: PropTypes.object,
    events: PropTypes.object
};
function mapStateToProps(state) {
    return {
        events: state.events,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        eventsActions: bindActionCreators(eventsActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewEvent);