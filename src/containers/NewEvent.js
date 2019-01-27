import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../actions/eventsActions';
import PropTypes from 'prop-types';
import EventBlock from '../components/EventBlock'
import { Card } from 'semantic-ui-react'

import * as _ from 'lodash'

class NewEvent extends Component {

    render() {
        return "new event"
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