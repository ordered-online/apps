import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route, Link } from './src/routing';
import { store, persistor } from './src/store';
import Home from './src/routes/Home';
import Imprint from './src/routes/Imprint'
import Login from './src/routes/Login'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router history={ Platform.OS === 'web' ? createBrowserHistory() : null}>
            <View style={styles.container}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/imprint" component={Imprint} />
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
    backgroundColor: '#57c75e',
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column"
  }
});
