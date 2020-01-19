import React from 'react';
import { View, StyleSheet } from 'react-native';
import { primaryColor } from '../constants/Colors';

import { Button } from '@ordered.online/components';

export default function NavItem({ title, onPress, ...rest }) {
  return (
    <View style={styles.navLink} {...rest}>
      <Button raised title={title} color={'#f8f8f8'} onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  navLink: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 4,
    display: 'flex',
    justifyContent: 'center',
  },
});
