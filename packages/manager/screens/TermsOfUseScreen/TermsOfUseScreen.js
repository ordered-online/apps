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
    alignContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default TermsOfUseScreen;
