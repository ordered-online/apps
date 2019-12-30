import React from 'react';
import { View, StyleSheet } from 'react-native';
import { primaryColor } from '../constants/Colors';

import { Button } from '@ordered.online/components';

export default function NavItem({ title, onPress, ...rest }) {
  return (
    <View style={styles.navLink} {...rest}>
      <Button title={title} color={primaryColor} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  navLink: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
  },
});
