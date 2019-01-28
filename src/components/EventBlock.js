import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react'

import moment from 'moment'

class ProfileForm extends Component {

    toDate = (date) => {
        //for whatever reason, firebase's .toDate() method of a timestamp wasn't working so I made my own
        return moment(date.seconds * 1000).format('MM/DD/YYYY')
    }

    toTime = (time) => {
        return moment(time.seconds * 1000).format('hh:mm A')
    }

    generateDescription = () => {
        let { event } = this.props
        return (
            <div className="card-container">
                <div className="card-info-container">
                    <div className="card-title">{event.title}</div>
                    <div className="card-description">
                        Location: {event.location}<br></br>
                        Date: {this.toDate(event.startTime)}<br></br>
                        Time: {this.toTime(event.startTime)} - {this.toTime(event.endTime)}
                    </div>
                </div>
                <div className="card-icons">
                    {event.isMandatory ? <Icon size='huge' color="blue" name='anchor' /> : null}
                </div>
            </div>
        )

    }

    render() {
        let { event } = this.props
        return <Card fluid color='blue' key={event.id} description={this.generateDescription()} />

    }

}

export default ProfileForm