import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';
import Footer from './Footer';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardWrapper}>
          <TextInput
            editable
            maxLength={40}
            placeholder="username"
            textContentType="username"
            onChangeText={username => this.setState({ username })}
            style={styles.textInput}
          />

          <View style={styles.card}>
            {Platform.OS === 'web' ? (
              <Text style={styles.cardText}>
                Input the {'\n'}
                Code to directly {'\n'}
                start ordering !
              </Text>
            ) : (
              <Text style={styles.cardText}>
                Scan the {'\n'}
                QR Code to directly {'\n'}
                start ordering !
              </Text>
            )}
          </View>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.buttonWrapper}>
            <Text style={styles.button}>I AM A LOCATION</Text>
          </View>
          <Footer />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  cardWrapper: {
    flex: 1,
    flexBasis: 66,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1,
  },
  card: {
    height: 225,
    width: 300,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 30,
    padding: 15,
    transform: [{ rotate: '10deg' }, { translateY: 30 }],
  },
  cardText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonWrapper: {
    width: 300,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    marginVertical: 20,
  },
  button: {
    textAlign: 'center',
    borderWidth: 5,
    fontSize: 20,
    borderRadius: 25,
    borderColor: '#57c75e',
    paddingHorizontal: 30,
    paddingVertical: 10,
    fontWeight: 'bold',
  },
  wrapper: {
    flex: 1,
    flexBasis: 33,
    backgroundColor: '#000000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 300,
    textAlign: 'center',
    borderRadius: 25,
    backgroundColor: '#ffffff',
    paddingVertical: 15,
  },
});

// Exports
export default Home;
