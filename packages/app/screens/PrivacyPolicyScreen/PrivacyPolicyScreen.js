import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

class PrivacyPolicyScreen extends Component {
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

export default PrivacyPolicyScreen;
