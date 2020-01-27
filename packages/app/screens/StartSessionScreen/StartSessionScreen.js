import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, Icon, Input, Button, QRCode } from '@ordered.online/components';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import {
  ConnectSession,
  GetSession,
  ResetSession,
  validateSessionCode,
} from '../../store/orders';

import Colors from '../../constants/Colors';

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
      permissionState: Permissions.PermissionStatus.UNDETERMINED,
      scanning: false,
      code: '',
    };

    this.getCameraPermissionsAndScan = this.getCameraPermissionsAndScan.bind(
      this
    );
    this.handleBarCodeScanned = this.handleBarCodeScanned.bind(this);
    this.renderBarcodeScanner = this.renderBarcodeScanner.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { session } = nextProps;
    if (session && session.code) {
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
      Alert.alert(
        'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      );
    }
  }

  async getCameraPermissionsAndScan() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status !== Permissions.PermissionStatus.GRANTED) {
      this.setState({
        errorMessage: 'Permission to access location was denied',
        permissionState: Permissions.PermissionStatus.DENIED,
      });
    } else {
      this.setState({
        permissionState: Permissions.PermissionStatus.GRANTED,
      });
    }
    this.scanCode();
  }

  handleBarCodeScanned({ type, data }) {
    if (validateSessionCode(data)) {
      this.setState({ scanning: false, code: data });
      this.props.getSession(data);
      this.props.connectSession(data);
    }
  }

  scanCode() {
    const { permissionState } = this.state;
    switch (permissionState) {
      case Permissions.PermissionStatus.UNDETERMINED:
        this.getCameraPermissionsAndScan();
        break;
      case Permissions.PermissionStatus.GRANTED:
        this.setState({ scanning: true });
        break;
      case Permissions.PermissionStatus.DENIED:
      default:
        Alert.alert(
          'Scanning is not possible.',
          'The app has no access to the camera.'
        );
        break;
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
        <QRCode value={session.code} size={200} />
        <Text style={{ textAlign: 'center' }}>{session.code}</Text>

        <View style={styles.buttonWrapper}>
          <Button
            raised
            titleStyle={{ color: '#fff' }}
            title="Go to Products"
            onPress={() =>
              navigation.navigate('Products', {
                locationName: location.name,
              })
            }
          />
          <Button
            raised
            titleStyle={{ color: '#fff' }}
            title="Quit Session"
            onPress={() => this.props.resetSession()}
          />
        </View>
      </View>
    );
  }

  renderBarcodeScanner() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible
        onRequestClose={() => this.setState({ scanning: false })}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
        <Icon
          name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
          type="ionicon"
          raised
          reverse
          size={24}
          onPress={() => this.setState({ scanning: false })}
          containerStyle={{ position: 'absolute', top: 24, left: 24 }}
          color={Colors.primaryColor}
        />
      </Modal>
    );
  }

  renderLoading() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  render() {
    const { permissionState, scanning } = this.state;
    const { fetching, connecting, session } = this.props;

    if (
      permissionState === Permissions.PermissionStatus.GRANTED &&
      scanning &&
      !isWeb
    ) {
      return this.renderBarcodeScanner();
    }

    if (session && session.code) {
      return this.renderSession();
    }

    if (fetching || connecting) {
      return this.renderLoading();
    }

    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Input
            editable
            maxLength={40}
            placeholder="Type the code at your table"
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
          <Button
            raised
            titleStyle={{ color: '#fff' }}
            title="Start Your Order"
            onPress={() => this.handleBarCodeInput()}
          />
        </View>
        {!isWeb && (
          <Icon
            name={Platform.OS === 'ios' ? 'ios-qr-scanner' : 'md-qr-scanner'}
            type="ionicon"
            raised
            reverse
            size={60}
            onPress={() => this.scanCode()}
            containerStyle={styles.iconContainer}
            color={Colors.primaryColor}
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
    alignItems: 'stretch',
    paddingHorizontal: 15,
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
      resetSession: ResetSession,
    },
    dispatch
  ),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(StartSessionScreen);
