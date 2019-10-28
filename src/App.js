import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router, Switch, Route, Link } from './routing';
import { createBrowserHistory } from 'history';
import { store, persistor } from './store';
import Home from './components/Home';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={ Platform.OS === 'web' ? createBrowserHistory() : null}>
            <View style={styles.container}>
              <View style={styles.nav}>
                <Link to="/">
                  <Text>Home</Text>
                </Link>
              </View>

              {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}

              <Switch>
                <Route exact path="/" component={Home} />
              </Switch>
            </View>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 20,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
