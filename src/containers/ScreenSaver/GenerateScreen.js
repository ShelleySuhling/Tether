import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventsActions from '../../actions/eventsActions';
import PropTypes from 'prop-types';
import domtoimage from 'dom-to-image';
import * as _ from 'lodash'
import { Button } from 'semantic-ui-react'
import { saveAs } from 'file-saver';
import ScreenSaverCanvas from '../../components/ScreenSaver/ScreenSaverCanvas'

import Mobile from '../../components/Mobile'
import Default from '../../components/Default'


class GenerateScreen extends Component {
    constructor(props) {
        super(props)
    }

    generateScreenSaver = () => {
        domtoimage.toBlob(this.node)
            .then(function (blob) {
                window.saveAs(blob, 'my-node.png');
            });
    }

    render() {
        return (
            <div className="content-container" >
                <div className="screen-saver-container">
                    <div ref={node => this.node = node}>
                        <ScreenSaverCanvas viewHeight={window.innerHeight} viewWidth={window.innerWidth} />
                    </div>
                    <div className="screen-saver-options">
                        <Button onClick={() => { this.generateScreenSaver() }}>Generate Screen Saver</Button>
                    </div>
                </div>
            </div>
        )
    }
}

GenerateScreen.propTypes = {
    eventsActions: PropTypes.object,
    events: PropTypes.object
};
function mapStateToProps(state) {
    return {
        events: state.events,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        eventsActions: bindActionCreators(eventsActions, dispatch)
    };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenerateScreen);