import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, Icon } from 'semantic-ui-react'

import moment from 'moment'

class EventBlock extends Component {

    generateDescription = () => {
        let { event, user } = this.props
        return (
            <div className="card-container">
                <div className="card-info-container">
                    <div className="card-title">{event.title}</div>
                    <div className="card-description">
                        Location: {event.location}<br></br>
                        Date: {moment(event.startTime).format("MMM Do YY")}<br></br>
                        Time: {moment(event.startTime).format('LT')} - {moment(event.endTime).format('LT')}
                    </div>
                </div>
                <div className="card-icons">
                    {event.isMandatory ? <Icon size='huge' color="blue" name='anchor' /> : null}
                    {user.role === "master"
                        ? <Link to={"/edit_event/" + event.id}>
                            <Icon size='large' color="blue" name='ellipsis horizontal' />
                        </Link>
                        : null
                    }
                </div>
            </div>
        )

    }

    render() {
        let { event } = this.props
        return <Card fluid color='blue' key={event.id} description={this.generateDescription()} />

    }

}

export default EventBlock