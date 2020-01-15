import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const TabBarIcon = ({ iconName, focused }) => {
  return (
    <Ionicons
      name={iconName}
      size={30}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
};

export default TabBarIcon;
