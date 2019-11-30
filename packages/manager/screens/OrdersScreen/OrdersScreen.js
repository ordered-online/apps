import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class OrdersScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> Overview over all Orders: </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrdersScreen;
