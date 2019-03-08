import React, { Component } from 'react';
import * as _ from 'lodash'
import moment from 'moment'

class ScreenSaverCanvas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            width: this.props.params.width * this.props.params.previewScale + "px",
            height: this.props.params.height * this.props.params.previewScale + "px",
        }
    }

    translateBorderRadius = () => {
        //this should be refactored later
        let { params } = this.props
        if (!params.verticalPlacement) { params.verticalPlacement = "flex-start" }
        if (!params.horizontalPlacement) { params.horizontalPlacement = "flex-start" }
        if (params.verticalPlacement === "flex-start") {
            if (params.horizontalPlacement === "flex-start") { return "0 0 15px 0" }
            if (params.horizontalPlacement === "center") { return "0 0 15px 15px" }
            if (params.horizontalPlacement === "flex-end") { return "0 0 0 15px" }
        } else if (params.verticalPlacement === "center") {
            if (params.horizontalPlacement === "flex-start") { return "0 15px 15px 0" }
            if (params.horizontalPlacement === "center") { return "15px" }
            if (params.horizontalPlacement === "flex-end") { return "15px 0 0 15px" }
        } else if (params.verticalPlacement === "flex-end") {
            if (params.horizontalPlacement === "flex-start") { return "0 15px 0 0" }
            if (params.horizontalPlacement === "center") { return "15px 15px 0 0" }
            if (params.horizontalPlacement === "flex-end") { return "15px 0 0 0" }
        }
    }

    displayEventDetails() {
        let { events } = this.props
        return _.map(events, m => {
            return <div key="m.title" className="screen-saver-event">
                <div className="title">{m.title}</div>
                <div className="time">{moment(m.startTime).format("ddd h:MM a")}</div>
            </div>
        })
    }

    render() {
        let { params } = this.props
        let canvas_styles = {
            display: "flex",
            position: "relative",
            width: this.state.width,
            height: this.state.height,
            alignItems: params.verticalPlacement,
            justifyContent: params.horizontalPlacement,
        }
        console.log(params)
        console.log(this.translateBorderRadius())

        return (
            <div className="screen-saver-canvas" style={canvas_styles}>
                <img src={params.backgroundImage}
                    alt="background"
                    style={{
                        height: this.state.height,
                        width: this.state.width,
                        objectFit: "cover",
                    }} />
                <div className="screen-saver-events-wrapper" style={{ borderRadius: this.translateBorderRadius() }}>
                    <div className="screen-saver-header">Your events for this week:</div>
                    {this.displayEventDetails()}
                </div>
            </div >
        )
    }

}

export default ScreenSaverCanvas

