import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '@ordered.online/components';

export class OverviewScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          color="#57c75e"
          title="Manage your Locations"
          onPress={() => this.props.navigation.navigate('locations')}
        />
        <Text>{'\n'}</Text>
        <Button
          color="#57c75e"
          title="View Orders"
          onPress={() => this.props.navigation.navigate('orders')}
        />
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

export default OverviewScreen;
