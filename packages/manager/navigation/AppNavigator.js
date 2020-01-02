import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Router, Switch, Route } from './routing';
import PrivateRoute from './PrivateRoute';

import Navbar from './Navbar';

import HomeScreen from '../screens/HomeScreen';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import OverviewScreen from '../screens/OverviewScreen';
import LocationsScreen from '../screens/LocationsScreen';
import LocationsDetailScreen from '../screens/LocationDetailScreen';
import EditLocationScreen from '../screens/EditLocationScreen';
import OdersScreen from '../screens/OrdersScreen';

import ImprintScreen from '../screens/ImprintScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';

import { history } from '../store';

export const navigationProp = {
  navigate: function(route) {
    history.push('/' + route);
  },
};

class AppNavigator extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Navbar navigation={navigationProp} />
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
            path="/locations"
            component={LocationsScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/create"
            component={EditLocationScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/:id"
            component={LocationsDetailScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/edit/:id"
            component={EditLocationScreen}
            navigation={navigationProp}
            componentProps={{
              edit: true,
            }}
          />

          <PrivateRoute
            exact
            path="/locations/:location_id/products"
            component={OdersScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/:location_id/orders"
            component={OdersScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/:location_id/orders/:session_code"
            component={OdersScreen}
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
      </ConnectedRouter>
    );
  }
}

export default AppNavigator;
