import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import api from '@ordered.online/api';
import { Text } from '@ordered.online/components';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.checkauthenticated = this.checkauthenticated.bind(this);
  }

  componentDidMount() {
    this.checkauthenticated();
    console.log(api);
  }

  componentDidUpdate() {
    this.checkauthenticated();
  }

  // Fetch the token from storage then navigate to our appropriate place if we are already logged in
  checkauthenticated() {
    const { authenticated } = this.props;
    if (authenticated) {
      this.props.navigation.navigate('locations');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text h1 style={styles.text}>
          Welcome to the ordered.online manager
        </Text>
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
  text: {
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  authenticated: state.authentication.authenticated,
});

export default connect(mapStateToProps, null)(HomeScreen);
