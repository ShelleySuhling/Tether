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
                    <div className="card-title">
                        {event.title}
                        <div className="card-icons">
                            {/* {event.isMandatory ? <Icon color="blue" name='anchor' /> : null} */}
                        </div>
                    </div>
                    <div className="card-description">
                        <div><Icon color="blue" name='map marker alternate' /> {event.location}</div>
                        <div><Icon color="blue" name='calendar outline' /> {moment(event.startTime).format("MMM Do YY")}</div>
                        <div><Icon color="blue" name='clock outline' />{moment(event.startTime).format('LT')} - {moment(event.endTime).format('LT')}</div>
                    </div>
                </div>
                <div className="card-icon-container">
                    {/* <div className="card-icons">
                    </div> */}
                    {event.isMandatory
                        ? <div className="corner-icon">
                            <Icon size='huge' color="blue" name='caret up' />
                        </div>
                        : <div>{null}</div>}

                    {user.role === "master"
                        ? <Link to={"/edit_event/" + event.id}>
                            <Icon size='large' color="blue" name='pencil alternate' />
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