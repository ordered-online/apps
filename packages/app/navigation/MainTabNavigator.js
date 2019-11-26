import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from './TabBarIcon';

import OrderScreen from '../screens/OrderScreen';

import SearchLocationsScreen from '../screens/SearchLocationsScreen';
import FindNearbyLocationsScreen from '../screens/FindNearbyLocationsScreen';

import CartScreen from '../screens/CartScreen';

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
    Order: OrderScreen,
  },
  config
);

OrderStack.navigationOptions = {
  tabBarLabel: 'Order',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconName={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'}
    />
  ),
};

OrderStack.path = '';

const LocationStack = createStackNavigator(
  {
    SearchLocations: SearchLocationsScreen,
    FindNearby: FindNearbyLocationsScreen,
  },
  config
);

LocationStack.navigationOptions = {
  tabBarLabel: 'Find Locations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconName={Platform.OS === 'ios' ? 'ios-pin' : 'md-pin'}
    />
  ),
};

LocationStack.path = '';

const CartStack = createStackNavigator(
  {
    Cart: CartScreen,
  },
  config
);

CartStack.navigationOptions = {
  tabBarLabel: 'Cart',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconName={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
    />
  ),
};

CartStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
    Imprint: ImprintScreen,
    Privacy: PrivacyPolicyScreen,
    Terms: TermsOfUseScreen,
  },
  {
    ...config,
    initialRouteName: 'About',
  }
);

AboutStack.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      iconName={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : `md-information-circle${focused ? '' : '-outline'}`
      }
    />
  ),
};

// AboutStack.path = '';

const tabNavigator = createBottomTabNavigator({
  OrderStack,
  LocationStack,
  CartStack,
  AboutStack,
});

tabNavigator.path = '';

export default tabNavigator;
