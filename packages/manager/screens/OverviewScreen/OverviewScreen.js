import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '@ordered.online/components';

export class OverviewScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Manage your Locations"
          onPress={() => this.props.navigation.navigate('locations')}
        />
        <Text>{'\n'}</Text>
        <Button
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
    alignItems: 'stretch',
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: '#f8f8f8',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 0.5,
  },
});

export default OverviewScreen;
