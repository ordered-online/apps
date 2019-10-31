import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SafeAreaView } from 'react-native';
import Home from './routes/Home';
import Imprint from './routes/Imprint';
import Login from './routes/Login';
import PrivacyPolicy from './routes/PrivacyPolicy';
import TermsOfUse from './routes/TermsOfUse';

export const history = createBrowserHistory();

const navigationProp = {
  navigate: function(route) {
    history.push('/' + route);
  },
};

export class RoutingContainer extends Component {
  render() {
    return (
      <SafeAreaView style={this.props.style}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
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
      </SafeAreaView>
    );
  }
}
