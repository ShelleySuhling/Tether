import React, { Component } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import { DatePicker, TimePicker } from 'antd';
import { Checkbox } from 'semantic-ui-react'

import moment from 'moment';

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