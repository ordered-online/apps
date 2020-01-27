import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Input, Image } from '@ordered.online/components';

import { Login } from '../../store/authentication';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.checkauthenticated = this.checkauthenticated.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
  }

  componentDidMount() {
    this.checkauthenticated();
  }

  componentDidUpdate() {
    this.checkauthenticated();
  }

  // Fetch the token from storage then navigate to our appropriate place if we are already logged in
  checkauthenticated() {
    const { authenticated, navigation } = this.props;
    if (authenticated) {
      navigation.navigate('locations');
    }
  }

  handleRegistration() {
    const { username, password } = this.state;

    // TODO: implement a simple validation schema

    this.props.loginUser({
      username,
      password,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              containerStyle={styles.logoContainer}
              source={require('../../assets/icon.png')}
            />
          </View>
          <Input
            editable
            maxLength={40}
            placeholder="username"
            textContentType="username"
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            containerStyle={styles.inputContainer}
          />

          <Input
            editable
            maxLength={40}
            secureTextEntry
            placeholder="password"
            textContentType="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            containerStyle={styles.inputContainer}
          />

          <View style={styles.inlineButtonContainer}>
            <View style={styles.buttonWrapper}>
              <Button
                raised
                color={'#57c75e'}
                titleStyle={{ color: '#fff' }}
                title="Login"
                loading={this.props.fetching}
                onPress={this.handleRegistration}
              />
            </View>

            <View style={styles.buttonWrapper}>
              <Button
                raised
                type="outline"
                title="or register instead"
                color={'#57c75e'}
                titleStyle={{ color: '#fff' }}
                onPress={() => this.props.navigation.navigate('register')}
              />
            </View>
          </View>
        </ScrollView>
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
  logo: {
    width: 200,
    height: 200,
  },
  logoContainer: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 0.5,
    margin: 24,
  },
  inlineButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonWrapper: {
    marginHorizontal: 8,
  },
  inputContainer: {
    flex: 0.9,
  },
});

const mapStateToProps = state => ({
  authenticated: state.authentication.authenticated,
  fetching: state.authentication.fetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginUser: Login,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
