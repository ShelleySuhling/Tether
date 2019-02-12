import React, { Component } from 'react';
import Responsive from 'react-responsive';

const Mobile = props => <Responsive {...props} maxWidth={767} />;

export default Mobile