import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SafeAreaView } from 'react-native';
import Home from './routes/Home';
import Imprint from './routes/Imprint';
import Login from './routes/Login';
import { from } from 'rxjs';

export default class RoutingContainer extends Component {
  render() {
    return (
      <SafeAreaView style={this.props.style}>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/imprint" component={Imprint} />
          </Switch>
        </Router>
      </SafeAreaView>
    );
  }
}
