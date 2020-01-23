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
import { Text, Icon, Input, Button, Image } from '@ordered.online/components';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import {
  ConnectSession,
  GetSession,
  GetSessionQR,
  validateSessionCode,
} from '../../store/orders';

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
      hasCameraPermission: false,
      scanning: false,
      scanned: false,
      errorMessage: null,
      code: '0000000000000000000000000000000000000000',
    };

    this.getCameraPermissions = this.getCameraPermissions.bind(this);
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { session } = nextProps;
    if (session && session.code) {
      if (!session.hasOwnProperty('base64')) {
        setTimeout(() => nextProps.getSessionQR(session.code), 1000);
      }
      const { location_id } = session;
      if (location_id) {
        const location = nextProps.locations[location_id];
        if (location) {
          nextProps.navigation.navigate('Products', {
            locationName: location.name,
          });
        }
      }
    }
    return null;
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    }
    if (!isWeb) {
      this.getCameraPermissions();
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
    if (validateSessionCode(data)) {
      this.setState({ scanned: true, scanning: false, code: data });
      this.props.getSession(data);
      this.props.connectSession(data);
    }
  }

  scanCode() {
    if (!this.state.hasCameraPermission) {
      this.getCameraPermissions();
    } else {
      this.setState({ scanning: true });
    }
  }

  handleBarCodeInput() {
    const { code } = this.state;
    this.props.getSession(code);
    this.props.connectSession(code);
  }

  renderSession() {
    const { session, locations, navigation } = this.props;
    const location = locations[session.location_id];
    return (
      <View
        style={StyleSheet.flatten([
          styles.container,
          { alignItems: 'center' },
        ])}>
        <Text h3 style={{ textAlign: 'center' }}>
          Share your code to start ordering together !
        </Text>
        {session.hasOwnProperty('base64') && (
          <Image
            source={{
              uri: `data:image/svg+xml;base64,${session.base64}`,
            }}
            style={{ width: 300, height: 300 }}
            PlaceholderContent={
              <ActivityIndicator size="large" color={primaryColor} />
            }
          />
        )}
        <Text style={{ textAlign: 'center' }}>{session.code}</Text>

        <View style={styles.buttonWrapper}>
          <Button
            raised
            titleStyle={{ color: '#fff', width: '100%' }}
            title="Go to Products"
            onPress={() =>
              navigation.navigate('Products', {
                locationName: location.name,
              })
            }
          />
        </View>
      </View>
    );
  }

  render() {
    const { hasCameraPermission, scanning } = this.state;

    if (hasCameraPermission && scanning) {
      return (
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      );
    }

    const { fetching, connecting, session } = this.props;

    if (session && session.code) {
      return this.renderSession();
    }

    if (!hasCameraPermission && !isWeb) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission ...</Text>
        </View>
      );
    }

    if (fetching || connecting) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Icon
          name={Platform.OS === 'ios' ? 'ios-qr-scanner' : 'md-qr-scanner'}
          type="ionicon"
          raised
          reverse
          size={60}
          onPress={this.scanCode()}
          containerStyle={styles.iconContainer}
          color={primaryColor}
        />

        <View style={styles.inputWrapper}>
          <Input
            editable
            autoFocus
            multiline
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
    marginVertical: 25,
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
  fetching: state.orders.fetching,
  locations: state.locations.locations,
  connecting: state.orders.connecting,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      connectSession: ConnectSession,
      getSession: GetSession,
      getSessionQR: GetSessionQR,
    },
    dispatch
  ),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(StartSessionScreen);
