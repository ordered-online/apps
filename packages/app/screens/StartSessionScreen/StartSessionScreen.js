import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, Icon, Input, Button } from '@ordered.online/components';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { GetLocation } from '../../store/locations';
import { ConnectSession, GetSession } from '../../store/orders';

import { primaryColor } from '../../constants/Colors';

const isWeb = Platform.OS === 'web';

export class StartSessionScreen extends Component {
  static navigationOptions = {
    title: 'Start your order',
    headerStyle: {
      backgroundColor: '#f8f8f8',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    headerTintColor: '#57c75e',
    headerTitleStyle: {
      fontWeight: '600',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanning: false,
      scanned: false,
      errorMessage: null,
    };

    this.bootstrap = this.bootstrap.bind(this);
    this.getCameraPermissions = this.getCameraPermissions.bind(this);
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
  }

  componentDidMount() {
    if (this.props.session) {
      this.bootstrap();
    }
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    }
  }

  bootstrap() {
    this.props.dispatch(GetSession(this.props.session.code)).then(() => {
      const { location_id } = this.props.session;
      if (location_id) {
        this.props.dispatch(GetLocation(location_id)).then(() => {
          const location = this.props.locations[location_id];
          this.props.navigation.navigate('Products', {
            locationName: location.name,
          });
        });
      }
    });
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
    const { fetchingOrders, fetchingLocation, connecting } = this.props;

    if (hasCameraPermission === null && !isWeb) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission ...</Text>
        </View>
      );
    }

    if (fetchingOrders || fetchingLocation || connecting) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={primaryColor} />
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
        <Icon
          name={Platform.OS === 'ios' ? 'ios-qr-scanner' : 'md-qr-scanner'}
          type="ionicon"
          raised
          reverse
          size={60}
          onPress={this.scanCode}
          containerStyle={styles.iconContainer}
          color={primaryColor}
        />

        <View style={styles.inputWrapper}>
          <Input
            editable
            autoFocus
            maxLength={40}
            placeholder="Type or scan the code our your table"
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
            containerStyle={{ marginBottom: 20, maxWidth: 325 }}
          />

          <View style={styles.buttonWrapper}>
            <Button
              raised
              titleStyle={{ color: '#fff', width: '100%' }}
              title="Start Your Order"
              onPress={() => this.handleBarCodeInput()}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  scanner: {
    flex: 1,
  },
  inputWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
  iconContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

const mapStateToProps = state => ({
  session: state.orders.session,
  fetchingOrders: state.orders.fetching,
  fetchingLocation: state.locations.fetching,
  connecting: state.orders.connecting,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      connectSession: ConnectSession,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StartSessionScreen);
