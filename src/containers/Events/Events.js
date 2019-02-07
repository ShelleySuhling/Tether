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
import Responsive from 'react-responsive';


import * as _ from 'lodash'

const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

class Events extends Component {
    constructor(props) {
        super(props)
        this.state = {
            view_context: "this",
            view_time: "week",
            events: this.props.events.eventsList,
            now: moment(),
        }
    }
    componentWillMount() {
        this.props.eventsActions.requestEvents()
    }

    collectEventsByView = () => {
        let { view_context, view_time, events, now } = this.state


        if (view_context == "this") {
            return _.filter(events, (e => {
                return (now.isSame(moment(e.startTime), view_time) && now.isBefore(moment(e.startTime)))
            }))
        } else if (view_context == "next") {
            return _.filter(events, (e => {
                return (now.add(1, view_time).isSame(moment(e.startTime), view_time) && now.isBefore(moment(e.startTime)))
            }))
        }
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
                        <EventHeader session={session} />
                        <Card.Group>
                            {this.renderEvents(view_events)}
                        </Card.Group>
                    </div>
                </Default>
                <Mobile>
                    <div className="events-container-mobile">
                        <div className="events-header">
                            Hey {session.user.fullName}, <br />
                            here are your events for this week
                        </div>
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