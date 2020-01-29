import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  NetInfo,
  DeviceInfo,
} from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';

import AppNavigator from './navigation/AppNavigator';

import { LinearGradient } from 'expo-linear-gradient';

import { Alert } from '@ordered.online/components';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      connectionType: null,
      isConnected: null,
    };

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.handleNetworkChange = this.handleNetworkChange.bind(this);
  }

  async componentDidMount() {
    const state = (await NetInfo.fetch()) || {};
    const connectionType = state.type || 'unknown';
    const isConnected = state.isConnected || 'unknown';
    this.setState({
      connectionType,
      isConnected,
    });
    this.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  subscribe() {
    this.unsubscribeNetinfo = NetInfo.addEventListener(
      this.handleNetworkChange
    );
  }

  unsubscribe() {
    this.unsubscribeNetinfo && this.unsubscribeNetinfo();
    this.unsubscribeNetinfo = null;
  }

  handleNetworkChange(state) {
    this.setState({
      connectionType: state.type,
      isConnected: state.isConnected,
    });
    Alert.alert(state.type, state.isConnected);
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  }

  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={handleLoadingError}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LinearGradient style={{ flex: 1 }} colors={['#57c75e', '#27ae60']}>
              <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <View style={styles.roundedBackground}>
                  <AppNavigator />
                </View>
              </View>
            </LinearGradient>
          </PersistGate>
        </Provider>
      );
    }
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([require('./assets/icon.png')]),
    Font.loadAsync({
      ...Ionicons.font,
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  roundedBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f8f8f8',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 0.5,
  },
});
