import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../actions/eventsActions';
import PropTypes from 'prop-types';
import EventBlock from '../components/EventBlock'
import { Card, Icon } from 'semantic-ui-react'

import * as _ from 'lodash'

class Events extends Component {
    componentWillMount() {
        this.props.eventsActions.requestEvents()
    }

    renderEvents() {
        let { events } = this.props
        return _.map(events.eventsList, (e => { return <EventBlock key={e.id} event={e} /> }))
    }

    render() {
        return (
            <div className="content-container">
                <div className="plus-icon">
                    <Link to="/new_event">
                        <Icon size='huge' color="orange" name='plus circle' />
                    </Link>
                </div>
                <div className="events-container">
                    <Card.Group>
                        {this.renderEvents()}
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