import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

export class Input extends Component {
  render() {
    return <TextInput {...this.props} style={styles.textInput} />;
  }
}

const styles = StyleSheet.create({
  textInput: {
    textAlign: 'center',
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#57c75e',
  },
});

export default Input;
