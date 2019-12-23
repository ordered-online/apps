import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export class OrderScreen extends Component {
  constructor(props) {
    super(props);
    state = {
      hasCameraPermission: null,
      scanned: false,
      errorMessage: null,
    };

    this.getCameraPermissions = this.getCameraPermissions.bind(this);
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
  }

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

  async getCameraPermissions() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        hasCameraPermission: status === 'granted',
      });
    } else {
      this.setState({ hasCameraPermission: status === 'granted' });
    }
  }

  handleBarCodeScanned({ type, data }) {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.onBarCodeScanned && this.props.onBarCodeScanned(data);
  }

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
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this._handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            color="#57c75e"
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
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

export default OrderScreen;
