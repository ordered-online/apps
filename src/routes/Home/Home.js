import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StyledButton from '../../components/StyledButton';

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <StyledButton
          title="Go to Login"
          onPress={() => this.props.navigation.navigate('login')}
        />
        <StyledButton
          title="Go to Register"
          onPress={() => this.props.navigation.navigate('login')}
        />
        <StyledButton
          title="Go to Imprint"
          onPress={() => this.props.navigation.navigate('imprint')}
        />
        <StyledButton
          title="Go to Privacy Policy"
          onPress={() => this.props.navigation.navigate('privacy')}
        />
        <StyledButton
          title="Go to Terms of Use"
          onPress={() => this.props.navigation.navigate('terms')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Exports
export default Home;
