import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import api from '@ordered.online/api';
import { Text, Image } from '@ordered.online/components';

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
        <Image style={styles.logo} source={require('../../assets/icon.png')} />
        <Text h1 style={styles.heading}>
          ordered.online
          {'\n'}
          manager
        </Text>
        <Text h4 style={styles.subheading}>
          Simply order food online!
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
    marginLeft: 6,
    marginRight: 6,
    backgroundColor: '#f8f8f8',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 0.5,
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 12,
    margin: 24,
  },
  heading: {
    color: '#57c75e',
    fontWeight: '700',
    textAlign: 'center',
    margin: 12,
  },
  subheading: {
    color: '#222222',
    fontWeight: '300',
    textAlign: 'center',
    margin: 12,
  },
});

const mapStateToProps = state => ({
  authenticated: state.authentication.authenticated,
});

export default connect(mapStateToProps, null)(HomeScreen);
