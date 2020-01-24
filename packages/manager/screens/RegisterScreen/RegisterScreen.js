import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Input, Image } from '@ordered.online/components';

import { Register } from '../../store/authentication';

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
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

  checkauthenticated() {
    const { authenticated, navigation } = this.props;
    if (authenticated) {
      navigation.navigate('locations');
    }
  }

  handleRegistration() {
    const { username, password, email, first_name, last_name } = this.state;

    this.props.registerUser({
      username,
      password,
      email,
      first_name,
      last_name,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          containerStyle={styles.logoContainer}
          source={require('../../assets/icon.png')}
        />

        <Input
          editable
          maxLength={40}
          placeholder="username"
          textContentType="username"
          value={this.state.username}
          onChangeText={username => this.setState({ username })}
          containerStyle={styles.inputContainer}
        />

        <Input
          editable
          maxLength={40}
          placeholder="email"
          textContentType="emailAddress"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          containerStyle={styles.inputContainer}
        />

        <Input
          editable
          maxLength={40}
          placeholder="firstname"
          textContentType="givenName"
          value={this.state.first_name}
          onChangeText={first_name => this.setState({ first_name })}
          containerStyle={styles.inputContainer}
        />

        <Input
          editable
          maxLength={40}
          placeholder="lastname"
          textContentType="familyName"
          value={this.state.last_name}
          onChangeText={last_name => this.setState({ last_name })}
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
              title="Register"
              loading={this.props.fetching}
              onPress={this.handleRegistration}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              raised
              color={'#57c75e'}
              titleStyle={{ color: '#fff', padding: 4 }}
              type="outline"
              title="or login instead"
              onPress={() => this.props.navigation.navigate('login')}
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
  buttonWrapper: {
    marginHorizontal: 8,
  },
  inlineButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputContainer: {
    width: '70%',
  },
});

const mapStateToProps = state => ({
  authenticated: state.authentication.authenticated,
  fetching: state.authentication.fetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerUser: Register,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
