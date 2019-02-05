import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react'

class FormErrors extends Component {

    render() {
        let { errors } = this.props
        return (
            <div>
                {errors.length > 0 ? <Segment inverted color='red' tertiary>{errors.map((e) => { return <div>{e}</div> })}</Segment> : null}
            </div>
        )
    }
}

export default FormErrors