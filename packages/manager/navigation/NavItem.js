import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from '@ordered.online/components';

export default function NavItem({ title, onPress, ...rest }) {
  return (
    <View style={styles.navLink} {...rest}>
      <Button
        raised
        titleStyle={{ color: '#fff' }}
        title={title}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  navLink: {
    paddingHorizontal: 5,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
});
