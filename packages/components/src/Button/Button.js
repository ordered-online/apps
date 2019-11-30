import React, { Component } from 'react';
import { Button as RNButton } from 'react-native';

export class Button extends Component {
  render() {
    return <RNButton {...this.props} />;
  }
}

export default Button;
