import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, Linking } from 'react-native';

export default class Imprint extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.baseText}>
            The ordered.online© platform was developed by
          </Text>

          <Text style={styles.nameText}>Philipp Matthes</Text>

          <Text style={styles.baseText}>and</Text>

          <Text style={styles.nameText}>Felix Kästner</Text>

          <Text style={styles.baseText}>
            For more information please
            {'\n'}
            {'\n'}
            <Button
              title="contact us"
              onPress={() => Linking.openURL('mailto:contact@ordered.online')}
            />
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    position: 'relative',
  },
  baseText: {
    fontSize: 20,
    textAlign: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});
