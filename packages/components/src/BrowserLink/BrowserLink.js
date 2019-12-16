import React, { Component } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { WebBrowser } from 'expo';

export default class BrowserLink extends Component {
  constructor(props) {
    super(props);
    this.handleOpenWithWebBrowser = this.handleOpenWithWebBrowser.bind(this);
  }

  handleOpenWithWebBrowser() {
    WebBrowser.openBrowserAsync(this.props.href);
    this.props.onPress && this.props.onPress();
  }

  render() {
    const { children } = this.props;

    if (React.Children.count(children) > 1) {
      children = <View>{children}</View>;
    }

    return (
      <TouchableWithoutFeedback
        {...this.props}
        onPress={this.handleOpenWithWebBrowser}>
        {children}
      </TouchableWithoutFeedback>
    );
  }
}
