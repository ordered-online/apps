import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, Linking } from 'react-native';
import Anchor from '../../components/Anchor';
import { Link } from '../../routing';

export default class Imprint extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ position: 'absolute', top: 20, left: 20 }}>
          <Text style={{ fontSize: 20, textAlign: 'center' }}>
            <Link to="/" style={{ textDecorationLine: 'none' }}>
              <Text>Home</Text>
            </Link>
          </Text>
        </View>

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
