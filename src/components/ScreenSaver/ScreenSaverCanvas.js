import React, { Component } from 'react';

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

class ScreenSaverCanvas extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        let { params } = this.props
        let canvas_styles = {
            width: params.width * .75 + "px",
            height: params.height * .75 + "px",
            backgroundColor: params.backgroundColor,
            display: "flex",
            alignItems: translateVerticalPlacement[params.verticalPlacement],
            justifyContent: translateHorizontalPlacement[params.horizontalPlacement],
            margin: "5px",
        }

        return (
            <div className="screen-saver-canvas" style={canvas_styles}>
                {params.backgroundColor}
            </div>
        )
    }

}

export default ScreenSaverCanvas

