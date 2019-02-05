import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import * as usersActions from '../../actions/usersActions';
import * as sessionActions from '../../actions/sessionActions';
import ProfileForm from '../../components/Forms/ProfileForm'


class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active_user: props.users.active_user
        }
    }

    componentWillMount() {
        this.props.usersActions.getUserProfile(this.props.session.user.uid)
    }

    componentWillUnmount() {
        this.props.sessionActions.clearAuthErrors()
    }



    handleChange = (event) => {
        this.setState({
            ...this.state,
            active_user: {
                ...this.state.active_user,
                [event.target.name]: event.target.value
            }
        });
    }

    onSubmit = () => {
        this.props.usersActions.requestUpdateUser(this.state.active_user)
    }

    render() {
        const { users } = this.props
        return (<div className="content-container">
            <ProfileForm handleChange={this.handleChange} onSubmit={this.onSubmit} user={this.state.active_user} isLoading={users.pending_user}></ProfileForm>
        </div>)
    }
}

EditProfile.propTypes = {
    usersActions: PropTypes.object,
    users: PropTypes.object,
    session: PropTypes.object,
};
function mapStateToProps(state) {
    return {
        users: state.users,
        session: state.session,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        usersActions: bindActionCreators(usersActions, dispatch),
        sessionActions: bindActionCreators(sessionActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile);