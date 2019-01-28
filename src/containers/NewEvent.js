import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../actions/eventsActions';
import PropTypes from 'prop-types';
import EventForm from '../components/EventForm'

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
        }
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        });
    }

    toggleMandatory = () => {
        this.setState({
            isMandatory: !this.state.isMandatory
        })
    }

    onSubmit = () => {
        this.props.eventsActions.requestCreateEvent(this.state)
    }

    render() {
        return (<div className="content-container">
            <EventForm event={this.state} handleChange={this.handleChange} toggleMandatory={this.toggleMandatory} onSubmit={this.onSubmit} submitText="Create Event" />
        </div >)
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