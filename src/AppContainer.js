import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, Text, Platform } from 'react-native';
import { Router, Switch, Route, Redirect, Link } from './routing';
import { createBrowserHistory } from 'history';
import Home from './routes/Home';
import Imprint from './routes/Imprint';
import Login from './routes/Login';
import PrivacyPolicy from './routes/PrivacyPolicy';
import TermsOfUse from './routes/TermsOfUse';

const isWeb = Platform.OS == 'web';

export const history = isWeb ? createBrowserHistory() : '';

const navigationProp = {
  navigate: function(route) {
    history.push('/' + route);
  },
};

export default class AppContainer extends Component {
  renderDesktopNavigation() {
    return (
      <View style={styles.nav}>
        <Link to="/home">
          <Text>Home</Text>
        </Link>
        <Link to="/login">
          <Text>Login</Text>
        </Link>
        <Link to="/imprint">
          <Text>Imprint</Text>
        </Link>
        <Link to="/privacy">
          <Text>Privacy Policy</Text>
        </Link>
        <Link to="/terms">
          <Text>Terms of Use</Text>
        </Link>
      </View>
    );
  }

  renderMobileNavigation() {
    return (
      <View style={styles.nav}>
        <Link to="/home">
          <Text>Home</Text>
        </Link>
        <Link to="/login">
          <Text>Login</Text>
        </Link>
        <Link to="/imprint">
          <Text>Imprint</Text>
        </Link>
        <Link to="/privacy">
          <Text>Privacy Policy</Text>
        </Link>
        <Link to="/terms">
          <Text>Terms of Use</Text>
        </Link>
      </View>
    );
  }

  render() {
    const { width } = Dimensions.get('window');

    const navigation =
      width > 996
        ? this.renderDesktopNavigation()
        : this.renderMobileNavigation();

    return (
      <Router history={history}>
        {navigation}
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home navigation={navigationProp} />}
          />
          <Route
            exact
            path="/home"
            render={() => <Home navigation={navigationProp} />}
          />
          <Route
            exact
            path="/login"
            render={() => <Login navigation={navigationProp} />}
          />
          <Route
            exact
            path="/imprint"
            render={() => <Imprint navigation={navigationProp} />}
          />
          <Route
            exact
            path="/privacy"
            render={() => <PrivacyPolicy navigation={navigationProp} />}
          />
          <Route
            exact
            path="/terms"
            render={() => <TermsOfUse navigation={navigationProp} />}
          />
        </Switch>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
