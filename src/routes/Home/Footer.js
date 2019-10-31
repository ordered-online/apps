import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.nav}>
        IMPRINT {'\n'}
        PRIVACY POLICY {'\n'}
        TERMS OF USE {'\n'}
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
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    lineHeight: 30,
  },
});

export default Footer;
