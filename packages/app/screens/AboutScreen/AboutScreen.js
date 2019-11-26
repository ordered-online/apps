import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Link } from '@ordered.online/components';

export class AboutScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Link
          title="Imprint"
          onPress={() => this.props.navigation.navigate('Imprint')}
        />
        <Link
          title="Privacy Policy "
          onPress={() => this.props.navigation.navigate('Privacy')}
        />
        <Link
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
