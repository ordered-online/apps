import React from 'react';
import { Platform, View } from 'react-native';
import { connect } from 'react-redux';

import { Badge } from '@ordered.online/components';

import TabBarIcon from './TabBarIcon';

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

export default connect(mapStateToProps, null)(CartIcon);
