import React, { Component } from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './routes/Home';
import Imprint from './routes/Imprint';
import Login from './routes/Login';
import PrivacyPolicy from './routes/PrivacyPolicy';
import TermsOfUse from './routes/TermsOfUse';

const AppNavigator = createStackNavigator(
  {
    home: Home,
    login: Login,
    imprint: Imprint,
    privacy: PrivacyPolicy,
    terms: TermsOfUse,
  },
  {
    initialRouteName: 'home',
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class RoutingContainer extends Component {
  render() {
    return (
      <SafeAreaView style={this.props.style}>
        <AppContainer />
      </SafeAreaView>
    );
  }
}
