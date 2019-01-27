import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react'

class ProfileForm extends Component {

    toDate = (date) => {
        //for whatever reason, firebase's .toDate() method of a timestamp wasn't working so I made my own
        return new Date(date.seconds * 1000).toString()
    }

    generateDescription = () => {
        let { event } = this.props
        console.log(this.toDate(event.startTime))
        return (
            <div className="card-container">
                <div className="card-info-container">
                    <div className="card-title">{event.title}</div>
                    <div className="card-description">
                        Location: {event.location}<br></br>
                        Time: {this.toDate(event.startTime)} - {this.toDate(event.endTime)}
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