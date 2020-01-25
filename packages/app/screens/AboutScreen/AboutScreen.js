import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { Button, Text } from '@ordered.online/components';

export class AboutScreen extends Component {
  static navigationOptions = {
    title: 'Imprint',
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
        <Text style={styles.content}>
          The ordered.online© platform was developed by {'\n'}Philipp Matthes
          and Felix Kästner Contact: contact@ordered.online
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
