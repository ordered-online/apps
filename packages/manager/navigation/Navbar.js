import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Layout from '../constants/Layout';

import Navigation from './Navigation';

export default class Navbar extends Component {
  render() {
    const { isSmallDevice } = Layout;

    const navbarStyles = [styles.navbar];
    if (!isSmallDevice) {
      navbarStyles.push({ justifyContent: 'flex-end' });
    }

    return (
      <View style={navbarStyles}>
        <Navigation navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    display: 'flex',
    flexDirection: 'row',
  },
});
