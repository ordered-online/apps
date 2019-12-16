import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from './routing';
import Colors from '../constants/Colors';

import { Button } from '@ordered.online/components';

export default function NavItem({ title, to, onPress, ...rest }) {
  const { primaryColor } = Colors;

  return (
    <View style={styles.navLink} {...rest}>
      {onPress ? (
        <Button title={title} color={primaryColor} onPress={onPress} />
      ) : (
        <Link to={to} style={{ textDecoration: 'none' }}>
          <Button title={title} color={primaryColor} />
        </Link>
      )}
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
