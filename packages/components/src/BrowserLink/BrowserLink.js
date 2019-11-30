import React, { Component } from 'react';
import { Text } from 'react-native';
import { WebBrowser } from 'expo';

export default class BrowserLink extends Component {
  _handleOpenWithWebBrowser = () => {
    WebBrowser.openBrowserAsync(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Text {...this.props} onPress={this._handleOpenWithWebBrowser}>
        {this.props.children}
      </Text>
    );
  }
}
