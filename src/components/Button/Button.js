import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export class Button extends Component {
  _handleOnPress = () => {
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, this.props.style]}
          onPress={this._handleOnPress}>
          {this.props.children}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#57c75e',
    padding: 10,
  },
});

export default Button;
