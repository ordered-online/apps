import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

export class OrderScreen extends Component {
  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderScreen;
