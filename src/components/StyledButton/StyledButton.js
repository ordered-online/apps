import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class StyledButton extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Button
          {...this.props}
          color="#57c75e"
          style={[this.props.style, styles.button]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 5,
  },
  button: {},
});
