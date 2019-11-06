import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import LocationFinder from '../../components/LocationFinder';
import QRCodeScanner from '../../components/QRCodeScanner';

class Home extends Component {
  state = {
    scanning: null,
    scannedCode: null,
  };

  _handleBarCodeScanned = data => {
    this.setState({ scanning: false, scannedCode: data });
  };

  render() {
    let { scanning, scannedCode } = this.state;
    let ScannerComponent = <View />;
    if (scanning === null) {
      ScannerComponent = (
        <Button
          title="Press to scan QR Code"
          style={{ width: 80 }}
          onPress={() => this.setState({ scanning: true })}
        />
      );
    }
    if (scanning === false) {
      ScannerComponent = <Text>Scanned QR Code {scannedCode}</Text>;
    }
    if (scanning === true) {
      ScannerComponent = (
        <QRCodeScanner onBarCodeScanned={this._handleBarCodeScanned} />
      );
    }

    return (
      <View style={styles.container}>
        <QRCodeScanner />
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

// Exports
export default Home;
