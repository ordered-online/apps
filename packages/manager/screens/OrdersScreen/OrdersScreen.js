import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ordered.online/components';

export class OrdersScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text h1> Overview over all Orders: </Text>
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
