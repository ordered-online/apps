import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Router, Switch, Route, Redirect, Link } from './routing';
import { createBrowserHistory } from 'history';
import PrivateRoute from './PrivateRoute';

import Navbar from './Navbar';

import HomeScreen from '../screens/HomeScreen';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import CreateLocationScreen from '../screens/CreateLocationScreen';

import ImprintScreen from '../screens/ImprintScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';

const isWeb = Platform.OS == 'web';
export const history = isWeb ? createBrowserHistory() : '';

export const navigationProp = {
  navigate: function(route) {
    history.push('/' + route);
  },
};

export class AppNavigator extends Component {
  render() {
    return (
      <Router history={history}>
        <Navbar />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <HomeScreen navigation={navigationProp} />}
          />

          {/** Login / Registration Pages */}

          <Route
            exact
            path="/login"
            render={() => <LoginScreen navigation={navigationProp} />}
          />
          <Route
            exact
            path="/register"
            render={() => <RegisterScreen navigation={navigationProp} />}
          />

          {/** Protected Pages */}

          <PrivateRoute
            exact
            path="/create/location"
            component={CreateLocationScreen}
            navigation={navigationProp}
          />

          {/** Static Pages */}

          <Route
            exact
            path="/imprint"
            render={() => <ImprintScreen navigation={navigationProp} />}
          />
          <Route
            exact
            path="/privacy"
            render={() => <PrivacyPolicyScreen navigation={navigationProp} />}
          />
          <Route
            exact
            path="/terms"
            render={() => <TermsOfUseScreen navigation={navigationProp} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default AppNavigator;
