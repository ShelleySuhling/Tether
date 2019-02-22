import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../../actions/eventsActions';
import PropTypes from 'prop-types';
import EventBlock from '../../components/Events/EventBlock'
import EventHeader from '../../components/Events/EventHeader'

import { Card } from 'semantic-ui-react'
import moment from 'moment'
//https://www.npmjs.com/package/react-responsive


import * as _ from 'lodash'

import Mobile from '../../components/Mobile'
import Default from '../../components/Default'

class Events extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view_context: "this",
            view_time: "week",
            events: this.props.events.eventsList,
        }
    }
    componentWillMount() {
        this.props.eventsActions.requestEvents()
    }

    collectEventsByView = () => {
        let { view_context, view_time, events } = this.state
        if (view_context == "this") {
            return _.filter(events, (e => {
                return (moment().isSame(moment(e.startTime), view_time) && moment().isBefore(moment(e.startTime)))
            }))
        } else if (view_context == "next") {
            return _.filter(events, (e => {
                return (moment().add(1, view_time).isSame(moment(e.startTime), view_time) && moment().isBefore(moment(e.startTime)))
            }))
        }
    }

    handleViewChange = (name, value) => {
        this.setState({
            [name]: value,
        })
    }

    renderEvents(view_events) {
        let { session } = this.props
        return _.map(_.sortBy(view_events, (e) => {
            return e.startTime
        }), (e => {
            return <EventBlock key={e.title} event={e} user={session.user} />
        }))
    }

    render() {
        let { session } = this.props
        let view_events = this.collectEventsByView()
        return (
            <div className="content-container" >
                <Default>
                    <div className="events-container-desktop">
                        <EventHeader session={session} handleViewChange={this.handleViewChange} />
                        <div className="events-card-container">
                            <Card.Group>
                                {this.renderEvents(view_events)}
                            </Card.Group>
                        </div>
                    </div>
                </Default>
                <Mobile>
                    <div className="events-container-mobile">
                        <EventHeader session={session} handleViewChange={this.handleViewChange} />
                        <Card.Group>
                            {this.renderEvents(view_events)}
                        </Card.Group>
                    </div>
                </Mobile>
            </div >
        )
    }
}

Events.propTypes = {
    eventsActions: PropTypes.object,
    events: PropTypes.object,
    session: PropTypes.object
};
function mapStateToProps(state) {
    return {
        events: state.events,
        session: state.session,
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