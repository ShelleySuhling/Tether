import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sessionActions from '../../actions/sessionActions';
import PropTypes from 'prop-types';

class SignOut extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: this.props.session.pending_signout
        }
    }

    componentWillMount() {
        this.props.sessionActions.requestSignOut(this.state)
    }

    render() {
        return (
            < div className="content-container" >
                {this.state.loading ? "Signing you out" : "You've been successfully signed out"}
            </div >
        )
    }
}

SignOut.propTypes = {
    sessionActions: PropTypes.object,
    session: PropTypes.object
};
function mapStateToProps(state) {
    return {
        session: state.session
    };
}
function mapDispatchToProps(dispatch) {
    return {
        sessionActions: bindActionCreators(sessionActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignOut);