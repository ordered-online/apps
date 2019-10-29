import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from '../../routing';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.nav}>
        <Link to="/imprint" style={{ textDecorationLine: 'none' }}>
          Imprint
        </Link>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    display: 'flex',
  },
  nav: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Footer;
