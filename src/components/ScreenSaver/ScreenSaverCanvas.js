import React, { Component } from 'react';



class ScreenSaverCanvas extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        let { viewHeight, viewWidth, backgroundColor } = this.props

        let canvas_styles = {
            width: viewWidth * .75 + "px",
            height: viewHeight * .75 + "px",
            backgroundColor: backgroundColor,
        }

        return (
            <div id="screen-saver" style={canvas_styles}>
                {backgroundColor}
            </div>
        )
    }

}

export default ScreenSaverCanvas

