import React, { Component } from 'react';
import * as _ from 'lodash'
import moment from 'moment'

let translateVerticalPlacement = {
    top: "flex-start",
    middle: "center",
    bottom: "flex-end"
}

let translateHorizontalPlacement = {
    left: "flex-start",
    center: "space-around",
    right: "flex-end"
}

let translateBackground = {
    beach: require("./beach-high-angle-shot-motion-1547727.jpg"),
    coffee: require("./beverage-blank-break-997719.jpg"),
    cactus: require("./art-blooming-blossom-1855272.jpg"),
    abstract: require("./adventure-atmosphere-conifer-418831.jpg"),

}

class ScreenSaverCanvas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            width: this.props.params.width * this.props.params.previewScale + "px",
            height: this.props.params.height * this.props.params.previewScale + "px",
        }
    }

    displayEventDetails() {
        let { events, params } = this.props
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
            width: this.state.width,
            height: this.state.height,
            display: "flex",
            position: "relative",
            alignItems: translateVerticalPlacement[params.verticalPlacement],
            justifyContent: translateHorizontalPlacement[params.horizontalPlacement],
        }

        return (
            <div className="screen-saver-canvas" style={canvas_styles}>
                <img src={translateBackground[params.backgroundColor]} style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                }} />
                <div className="screen-saver-events-wrapper">
                    {this.displayEventDetails()}
                </div>
            </div >
        )
    }

}

export default ScreenSaverCanvas

