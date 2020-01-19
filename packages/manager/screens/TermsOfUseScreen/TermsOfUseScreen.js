import React, { Component } from 'react';
import { Text, StyleSheet, View, Linking } from 'react-native';
import { Button } from '@ordered.online/components';

class TermsOfUseScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          All rights reserved from
          {'\n'}
          {'\n'}
          Philipp Matthes
          {'\n'}
          {'\n'}
          and
          {'\n'}
          {'\n'}
          Felix Kästner
          {'\n'}
          {'\n'}
          For more information please
          {'\n'}
          {'\n'}
        </Text>
        <Button
          title="Contact Us"
          onPress={() => Linking.openURL('mailto:contact@ordered.online')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: '#f8f8f8',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 0.5,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default TermsOfUseScreen;
