import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

const { height } = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      screenHeight: height,
    };

    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  onContentSizeChange(contentWidth, contentHeight) {
    this.setState({ screenHeight: contentHeight });
  }

  render() {
    const scrollEnabled = this.state.screenHeight > height;
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
            <SafeAreaView style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}>
                <AppNavigator />
              </ScrollView>
            </SafeAreaView>
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
      ...AntDesign.font,
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  // console.warn(error);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'column',
  },
  scrollview: {
    flexGrow: 1,
  },
});
