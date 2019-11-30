import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Router, Switch, Route, Redirect, Link } from './routing';
import { createBrowserHistory, createMemoryHistory } from 'history';
import PrivateRoute from './PrivateRoute';

import Navbar from './Navbar';

import HomeScreen from '../screens/HomeScreen';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import OverviewScreen from '../screens/OverviewScreen';
import LocationsScreen from '../screens/LocationsScreen';
import LocationsDetailScreen from '../screens/LocationDetailScreen';
import CreateLocationScreen from '../screens/CreateLocationScreen';
import OdersScreen from '../screens/OrdersScreen';
import LogoutScreen from '../screens/LogoutScreen';

import ImprintScreen from '../screens/ImprintScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';

const isWeb = Platform.OS == 'web';
export const history = isWeb ? createBrowserHistory() : createMemoryHistory();

export const navigationProp = {
  navigate: function(route) {
    history.push('/' + route);
  },
};

export class AppNavigator extends Component {
  render() {
    return (
      <Router history={history}>
        <Navbar onIconPress={() => history.goBack()} />
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
            path="/overview/"
            component={OverviewScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations"
            component={LocationsScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/location/:id"
            component={LocationsDetailScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/create"
            component={CreateLocationScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/orders/"
            component={OdersScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/logout"
            component={LogoutScreen}
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
