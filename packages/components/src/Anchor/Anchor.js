import React, { Component } from 'react';
import { Linking, TouchableWithoutFeedback, View } from 'react-native';

export default class Anchor extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  }

  render() {
    const { children } = this.props;

    if (React.Children.count(children) > 1) {
      children = <View>{children}</View>;
    }

    return (
      <TouchableWithoutFeedback {...this.props} onPress={this.handlePress}>
        {children}
      </TouchableWithoutFeedback>
    );
  }
}
