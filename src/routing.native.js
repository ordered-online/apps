import React, { Component } from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/routes/Home';
import Imprint from './src/routes/Imprint';
import Login from './src/routes/Login';

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Imprint: Imprint,
    Login: Login,
  },
  {
    initialRouteName: 'Home',
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
