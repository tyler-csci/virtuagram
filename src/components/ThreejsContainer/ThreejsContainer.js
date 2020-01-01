import React, { Component } from 'react';
import threeEntryPoint from './threeEntryPoint';

export default class ThreejsContainer extends Component {
    componentDidMount() {
        threeEntryPoint(this.threeRootElement);
    }
    render () {
        return (
            <div ref={element => this.threeRootElement = element} />
        );
    }
}