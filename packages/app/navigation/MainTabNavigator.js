import React from 'react';
import { Platform } from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from './TabBarIcon';

import OrderScreen from '../screens/OrderScreen';

import FindLocationsScreen from '../screens/FindLocationsScreen';

import CartScreen from '../screens/CartScreen';

import AboutScreen from '../screens/AboutScreen';
import ImprintScreen from '../screens/ImprintScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfUseScreen from '../screens/TermsOfUseScreen';

import Colors from '../constants/Colors';

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
    Locations: FindLocationsScreen,
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

AboutStack.path = '';

const creatTabNavigator = Platform.select({
  // web: createMaterialTopTabNavigator,
  web: createBottomTabNavigator,
  default: createBottomTabNavigator,
});

const tabNavigator = creatTabNavigator(
  {
    OrderStack,
    LocationStack,
    CartStack,
    AboutStack,
  },
  {
    tabBarOptions: Platform.select({
      web: {
        showLabel: false,
      },
      default: {
        showLabel: false,
      },
    }),
  }
);

tabNavigator.path = '';

export default tabNavigator;
