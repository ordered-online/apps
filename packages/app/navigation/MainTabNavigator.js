import React from 'react';
import { Platform, View } from 'react-native';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import { Badge } from '@ordered.online/components';
import { connect } from 'react-redux';

import TabBarIcon from './TabBarIcon';

import StartSessionScreen from '../screens/StartSessionScreen';
import ProductsScreen from '../screens/ProductsScreen';

import FindLocationsScreen from '../screens/FindLocationsScreen';
import LocationDetailScreen from '../screens/LocationDetailScreen';

import CartScreen from '../screens/CartScreen';

import AboutScreen from '../screens/AboutScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const OrderStack = createStackNavigator(
  {
    StartSession: StartSessionScreen,
    Products: ProductsScreen,
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
    LocationDetails: LocationDetailScreen,
  },
  {
    ...config,
    mode: 'modal',
  }
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

const CartIcon = ({ session, focused }) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
    <TabBarIcon
      focused={focused}
      iconName={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
    />
    <Badge
      value={
        session && session.orders
          ? session.orders.length.toString()
          : (0).toString()
      }
      containerStyle={{
        position: 'absolute',
        top: -15,
        right: -18,
      }}
    />
  </View>
);

const mapStateToProps = state => ({
  session: state.orders.session,
});

const ConnectedCartIcon = connect(mapStateToProps, null)(CartIcon);

CartStack.navigationOptions = {
  tabBarLabel: 'Cart',
  tabBarIcon: ({ focused }) => <ConnectedCartIcon focused={focused} />,
};

CartStack.path = '';

const AboutStack = createStackNavigator(
  {
    About: AboutScreen,
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
    tabBarOptions: {
      showLabel: false,
      style: {
        borderWidth: 0,
        backgroundColor: '#f8f8f8',
        borderRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 0.5,
      },
    },
  }
);

tabNavigator.path = '';

export default tabNavigator;
