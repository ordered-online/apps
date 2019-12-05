import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import api from '@ordered.online/api';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }

  componentDidMount() {
    this.checkLoggedIn();
    console.log(api);
  }

  componentDidUpdate() {
    this.checkLoggedIn();
  }

  // Fetch the token from storage then navigate to our appropriate place if we are already logged in
  checkLoggedIn() {
    const { loggedIn } = this.props;
    if (loggedIn) {
      this.props.navigation.navigate('overview');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the ordered.online manager</Text>
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

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
});

export default connect(mapStateToProps, null)(HomeScreen);
