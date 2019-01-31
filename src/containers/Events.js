import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../actions/eventsActions';
import PropTypes from 'prop-types';
import EventBlock from '../components/EventBlock'
import { Card } from 'semantic-ui-react'
import moment from 'moment'

import * as _ from 'lodash'

class Events extends Component {
    componentWillMount() {
        this.props.eventsActions.requestEvents()
    }

    toDate = (date) => {
        return moment(date.seconds * 1000)
    }

    collectEventsByView = (view, events) => {
        if (view === "future") {
            return _.filter(events.eventsList, (e => {
                return this.toDate(e.startTime).isAfter(new moment())
            }))
        } else if (view === "past") {
            return _.filter(events.eventsList, (e => {
                return this.toDate(e.startTime).isBefore(new moment())
            }))
        }
    }

    renderEvents(view_events) {
        console.log(this.props.events)

        return _.map(view_events, (e => {
            console.log('hit')
            return <EventBlock key={e.title} event={e} />
        }))
    }

    render() {
        let view_events = this.collectEventsByView('future', this.props.events)
        return (
            <div className="content-container">
                <div className="events-container">
                    <Card.Group>
                        {this.renderEvents(view_events)}
                    </Card.Group>
                </div>
            </div >
        )
    }
}

Events.propTypes = {
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
)(Events);