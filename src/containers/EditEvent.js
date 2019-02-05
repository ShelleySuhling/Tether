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



class EditEvent extends Component {

    constructor(props) {
        super(props)
        this.state = this.props.event
    }


    componentWillMount = () => {
        this.setState({
            ...this.state,
            event: _.find(this.props.events.eventsList, ['id', this.props.match.params.id])
        })
    }

    onSubmit = (event) => {
        console.log('event form submit', this.state)

        this.props.eventsActions.requestEditEvent(event)
    }

    render() {
        let { events } = this.props

        if (events.newEvent) {
            return <Redirect to='/events' />
        } else {
            return (
                <div className="content-container">
                    <EventForm event={this.state.event}
                        onSubmit={this.onSubmit}
                        submitText="Edit Event" />
                </div >)
        }
    }
}

EditEvent.propTypes = {
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
)(EditEvent);