import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, Linking } from 'react-native';
import Button from '../../components/Button';

export default class PrivacyPolicy extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          We proudly capture all of your data and sell it to satan.
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          At least we get a got deal ...{'\n'}
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
