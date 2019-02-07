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
        }
    }
    componentWillMount() {
        this.props.eventsActions.requestEvents()
    }

    collectEventsByView = () => {
        let { view_context, view_time, events } = this.state
        console.log('HIT')
        let now = moment()

        if (view_context == "this") {
            console.log('HIT2')

            return _.filter(events, (e => {
                console.log(now.isSame(moment(e.startTime), view_time), moment(now), moment(e.startTime), view_time)
                return (now.isSame(moment(e.startTime), view_time) && now.isBefore(moment(e.startTime)))
            }))
        } else if (view_context == "next") {
            console.log('HIT3')

            return _.filter(events, (e => {
                return (now.add(1, view_time).isSame(moment(e.startTime), view_time) && now.isBefore(moment(e.startTime)))
            }))
        }
    }

    handleViewChange = (name, value) => {
        console.log(name, value)
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
        console.log(this.state, this.props.events)
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