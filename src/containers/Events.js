import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../actions/eventsActions';
import PropTypes from 'prop-types';
import * as _ from 'lodash'

class Events extends Component {
    componentWillMount() {
        this.props.eventsActions.requestEvents()
    }

    renderEvents() {
        let { events } = this.props
        return _.map(events.eventsList, (e => { return e.title }))
    }

    render() {
        return (
            <div className="content-container">
                {this.renderEvents()}
            </div>
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