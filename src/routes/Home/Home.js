import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from '../../routing';
import Footer from './Footer';
import RoundedButton from '../../components/RoundedButton';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RoundedButton>
          <Link to="/login" style={{ textDecorationLine: 'none' }}>
            I am a store owner
          </Link>
        </RoundedButton>
        <Footer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 'auto',
    maxWidth: 400,
  },
});

// Exports
export default Home;
