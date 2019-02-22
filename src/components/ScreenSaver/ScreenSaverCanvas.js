import React, { Component } from 'react';



class ScreenSaverCanvas extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        let { viewHeight, viewWidth } = this.props
        this.canvas_styles = {
            width: viewWidth * .75 + "px",
            height: viewHeight * .75 + "px",
            backgroundColor: "blue",
        }
    }

    render() {
        let { reference } = this.props
        console.log(this.props, this.canvas_styles)
        return (
            <div style={this.canvas_styles}>
                jfldsjfklds
            </div>
        )
    }

}

export default ScreenSaverCanvas

