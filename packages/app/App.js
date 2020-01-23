import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';
import { LinearGradient } from 'expo-linear-gradient';

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };

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
            <LinearGradient
              style={{ width: '100%', height: '100%' }}
              colors={['#57c75e', '#27ae60']}>
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
