import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../actions/eventsActions';
import PropTypes from 'prop-types';
import EventBlock from '../components/EventBlock'
import { Card } from 'semantic-ui-react'
import moment from 'moment'
//https://www.npmjs.com/package/react-responsive
import Responsive from 'react-responsive';

import * as _ from 'lodash'

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;
class Events extends Component {
    componentWillMount() {
        this.props.eventsActions.requestEvents()
    }

    collectEventsByView = (view, events) => {
        if (view === "future") {
            return _.filter(events.eventsList, (e => {
                return moment(e.startTime).isAfter(new moment())
            }))
        } else if (view === "past") {
            return _.filter(events.eventsList, (e => {
                return moment(e.startTime).isBefore(new moment())
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
        let view_events = this.collectEventsByView('future', this.props.events)
        return (
            <div className="content-container" >

                <Default>
                    <div className="events-container-desktop">
                        <Card.Group>
                            {this.renderEvents(view_events)}
                        </Card.Group>
                    </div>
                </Default>
                <Mobile>
                    <div className="events-container-mobile">
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