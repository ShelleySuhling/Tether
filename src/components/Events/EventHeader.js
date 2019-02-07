import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'

let context_options = [
    {
        text: "this",
        value: "this"
    },
    {
        text: "next",
        value: "next"
    }
]
let time_options = [
    {
        text: "week",
        value: "week"
    },
    {
        text: "month",
        value: "month"
    }
]

class EventHeader extends Component {

    handleChange = (event, element) => {
        console.log("change", event, element)
    }

    render() {
        let { session } = this.props
        return <div className="events-header">
            <div className="events-header-line">Hey {session.user.fullName.split(' ')[0]},</div>
            <div className="events-header-line">here are your events for
                <div className="dropdown-wrapper">
                    <Dropdown inline options={context_options} defaultValue={context_options[0].value} onChange={this.handleChange} />
                </div>
                <div className="dropdown-wrapper">
                    <Dropdown inline options={time_options} defaultValue={time_options[0].value} onChange={this.handleChange} />
                </div>.
            </div>
        </div>
    }

}

export default EventHeader