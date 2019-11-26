import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

export class QRCodeScanner extends Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    errorMessage: null,
  };

  async componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getPermissionsAsync();
    }
  }

  _getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        hasCameraPermission: status === 'granted',
      });
    } else {
      this.setState({ hasCameraPermission: status === 'granted' });
    }
  };

  _handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.onBarCodeScanned && this.props.onBarCodeScanned(data);
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return (
        <View>
          <Text>Requesting for camera permission</Text>
        </View>
      );
    }
    if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this._handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }
}

export default QRCodeScanner;
