import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Router, Switch, Route } from './routing';
import PrivateRoute from './PrivateRoute';

import Navbar from './Navbar';

import HomeScreen from '../screens/HomeScreen';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import LocationsScreen from '../screens/LocationsScreen';
import LocationsDetailScreen from '../screens/LocationDetailScreen';
import LocationEditScreen from '../screens/LocationEditScreen';

import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProductEditScreen from '../screens/ProductEditScreen';

import OdersScreen from '../screens/OrdersScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';

import ImprintScreen from '../screens/ImprintScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';

import { history } from '../store';
import { LinearGradient } from 'expo-linear-gradient';

export const navigationProp = {
  navigate: function(route) {
    history.push('/' + route);
  },
};

class AppNavigator extends Component {
  render() {
    return (
      <ConnectedRouter history={history}>
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
            component={LocationEditScreen}
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
            component={LocationEditScreen}
            navigation={navigationProp}
            componentProps={{
              edit: true,
            }}
          />

          <PrivateRoute
            exact
            path="/locations/:location_id/products"
            component={ProductsScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/:location_id/products/create"
            component={ProductEditScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/:location_id/products/:product_id"
            component={ProductDetailScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/:location_id/products/edit/:product_id"
            component={ProductEditScreen}
            navigation={navigationProp}
            componentProps={{
              edit: true,
            }}
          />

          <PrivateRoute
            exact
            path="/locations/:location_id/sessions"
            component={OdersScreen}
            navigation={navigationProp}
          />

          <PrivateRoute
            exact
            path="/locations/:location_id/sessions/:session_code"
            component={OrderDetailScreen}
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
        <Navbar navigation={navigationProp} />
      </ConnectedRouter>
    );
  }
}

export default AppNavigator;
