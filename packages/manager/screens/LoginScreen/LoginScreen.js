import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Button, Input, Image } from '@ordered.online/components';

import { Login } from '../../store/authentication';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'admin',
      password: 'secret',
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
        <Image style={styles.logo} source={require('../../assets/icon.png')} />

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
          secureTextEntry={true}
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
              titleStyle={{ color: '#fff', padding: 4 }}
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
              titleStyle={{ color: '#fff', padding: 4 }}
              onPress={() => this.props.navigation.navigate('register')}
            />
          </View>
        </View>
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
    width: 100,
    height: 100,
    borderRadius: 12,
    margin: 24,
  },
  inlineButtonContainer: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonWrapper: {
    marginHorizontal: 8,
  },
  inputContainer: {
    marginBottom: 24,
    width: '90%',
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
