import React, { Component } from 'react';
import { Text, StyleSheet, View, Linking } from 'react-native';
import Button from '../../components/Button';

export default class TermsOfUse extends Component {
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
          <Button
            title="contact us"
            onPress={() => Linking.openURL('mailto:contact@ordered.online')}
          />
          {'\n'}
          {'\n'}
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate('home')}
          />
        </Text>
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
