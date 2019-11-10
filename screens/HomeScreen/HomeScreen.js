import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LocationFinder from '../../components/LocationFinder';
import QRCodeScanner from '../../components/QRCodeScanner';

class HomeScreen extends Component {
  state = {
    scanning: null,
    scannedCode: null,
  };

  _handleBarCodeScanned = data => {
    this.setState({ scanning: false, scannedCode: data });
  };

  render() {
     return (
      <View style={styles.container}>
        <QRCodeScanner onBarCodeScanned={this._handleBarCodeScanned} />
        <LocationFinder />
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

export default HomeScreen;
