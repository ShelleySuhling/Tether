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
    beach: "url(" + require("./beach-high-angle-shot-motion-1547727.jpg") + ")",
    coffee: "url(" + require("./black-and-white-black-and-white-caffeine-1897417.jpg") + ")",
    cactus: "url(" + require("./art-blooming-blossom-1855272.jpg") + ")",
}

class ScreenSaverCanvas extends Component {

    constructor(props) {
        super(props)
    }

    displayEventDetails() {
        let { events } = this.props
        return _.map(events, m => {
            return <div className="screen-saver-event">
                <div className="title">{m.title}</div>
                <div className="time">{moment(m.startTime).format("ddd h:MM a")}</div>
            </div>
        })
    }

    render() {
        let { params } = this.props
        let canvas_styles = {
            width: params.width * .75 + "px",
            height: params.height * .75 + "px",
            backgroundImage: translateBackground[params.backgroundColor],
            backgroundSize: params.width * .75 + "px  " + params.height * .75 + "px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            objectFit: "cover",
            display: "flex",
            alignItems: translateVerticalPlacement[params.verticalPlacement],
            justifyContent: translateHorizontalPlacement[params.horizontalPlacement],
            margin: "5px",
        }
        console.log(this.displayEventDetails())

        return (
            <div className="screen-saver-canvas" style={canvas_styles}>
                <div className="screen-saver-events-wrapper">
                    {this.displayEventDetails()}
                </div>
            </div>
        )
    }

}

export default ScreenSaverCanvas

