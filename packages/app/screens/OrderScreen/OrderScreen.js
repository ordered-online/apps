import React, { Component } from 'react';
import { View, StyleSheet, Platform, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, Icon, Input } from '@ordered.online/components';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { ConnectSession } from '../../store/orders';

const isWeb = Platform.OS === 'web';

export class OrderScreen extends Component {
  static navigationOptions = {
    title: 'Start your order',
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanning: false,
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
    this.setState({ scanned: true, scanning: false, code: data });
    console.log(
      `Bar code with type ${type} and data ${data} has been scanned!`
    );
    this.props.connectSession(data);
  }

  async scanCode() {
    console.log('Scan');
    if (isWeb) return;
    if (!this.state.hasCameraPermission) {
      await this.getCameraPermissions();
    }
    this.setState({ scanning: true });
  }

  handleBarCodeInput() {
    const { code } = this.state;
    console.log(code);
    this.props.connectSession(code);
  }

  render() {
    const { hasCameraPermission, scanning } = this.state;

    if (hasCameraPermission === null && !isWeb) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission ...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {hasCameraPermission && scanning && (
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.scanner}
          />
        )}

        <Input
          editable
          autoFocus
          maxLength={40}
          placeholder="Type or scan the code our your table"
          value={this.state.code}
          onChangeText={code => this.setState({ code })}
          rightIcon={
            <Icon
              name={Platform.OS === 'ios' ? 'ios-qr-scanner' : 'md-qr-scanner'}
              type="ionicon"
              onPress={this.scanCode}
            />
          }
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
    marginHorizontal: 'auto',
  },
  scanner: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  session: state.orders.session,
  fetching: state.orders.fetching,
  connecting: state.orders.connecting,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      connectSession: ConnectSession,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreen);
