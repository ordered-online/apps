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
        <View style={styles.navigationWrapper}></View>
        <Navigation />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 1,
  },
  navigationWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
