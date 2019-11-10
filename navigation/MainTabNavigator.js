import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

import AboutScreen from '../screens/AboutScreen';
import ImprintScreen from '../screens/ImprintScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const OrderStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

OrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' 
        ? 'ios-restaurant' 
        : 'md-restaurant'
      } />
  ),
};

OrderStack.path = '';

const ManagementStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    ...config,
    initialRouteName: 'Login'
  }
);

ManagementStack.navigationOptions = {
  tabBarLabel: 'Management',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={
      Platform.OS === 'ios' 
      ? 'ios-log-in' 
      : 'md-log-in'
    } />
  ),
};

ManagementStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
    Imprint: ImprintScreen,
    Privacy: PrivacyPolicyScreen,
    Terms: TermsOfUseScreen,
  },
  {
    ...config,
    initialRouteName: 'About'
  }
);

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={
      Platform.OS === 'ios' 
      ? `ios-information-circle${focused ? '' : '-outline'}` 
      : `md-information-circle${focused ? '' : '-outline'}`
    } />
  ),
};

// AboutStack.path = '';

const tabNavigator = createBottomTabNavigator({
  OrderStack,
  ManagementStack,
  AboutStack,
});

tabNavigator.path = '';

export default tabNavigator;
