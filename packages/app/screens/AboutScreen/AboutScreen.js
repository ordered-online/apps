import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from '@ordered.online/components';

export class AboutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Imprint"
          onPress={() => this.props.navigation.navigate('Imprint')}
        />
        <Button
          title="Privacy Policy "
          onPress={() => this.props.navigation.navigate('Privacy')}
        />
        <Button
          title="Terms of Use "
          onPress={() => this.props.navigation.navigate('Terms')}
        />
      </View>
    );
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

export default AboutScreen;
