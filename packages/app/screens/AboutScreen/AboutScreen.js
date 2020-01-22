import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Button, Text } from '@ordered.online/components';

export class AboutScreen extends Component {
  static navigationOptions = {
    title: 'Terms, Privacy and Imprint',
    headerStyle: {
      backgroundColor: '#f8f8f8',
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    headerTintColor: '#57c75e',
    headerTitleStyle: {
      fontWeight: '600',
    },
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}>
        <Text h2 style={styles.headline}>
          Imprint
        </Text>
        <Text style={styles.content}>
          The ordered.online© platform was developed by {'\n'}Philipp Matthes
          and Felix Kästner
        </Text>
        <Text h2 style={styles.headline}>
          Terms of Use
        </Text>
        <Text style={styles.content}>All rights reserved</Text>
        <Text h2 style={styles.headline}>
          Privacy Policy
        </Text>
        <Text style={styles.content}>
          We proudly capture all of your data and sell it to satan.
        </Text>
        <Text>
          <Button
            raised
            title="Contact us"
            titleStyle={{ color: '#fff', width: '100%' }}
            onPress={() => Linking.openURL('mailto:contact@ordered.online')}
          />
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    marginTop: 40,
  },
  content: {
    lineHeight: 40,
    textAlign: 'center',
  },
});

export default AboutScreen;
