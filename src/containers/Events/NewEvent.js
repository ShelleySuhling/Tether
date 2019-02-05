import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../../actions/eventsActions';
import PropTypes from 'prop-types';
import EventForm from '../../components/Forms/EventForm'
import { Redirect } from 'react-router-dom'

class NewEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            event: {}
        }
    }

    onSubmit = (event) => {
        this.props.eventsActions.requestCreateEvent(event)
    }

    render() {
        let { events } = this.props
        if (events.newEvent) {
            return <Redirect to='/events' />
        } else {
            return (
                <div className="content-container">
                    <EventForm
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