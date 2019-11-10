import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Link from '../../components/Link';


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Input
            editable
            maxLength={40}
            placeholder="username"
            textContentType="username"
            onChangeText={username => this.setState({ username })}
            style={{ textAlign: 'center' }}
          />

          <Input
            editable
            maxLength={40}
            placeholder="password"
            textContentType="password"
            onChangeText={password => this.setState({ password })}
          />

          <Button
            title="Login"
            onPress={() => console.warn('Login is not implemented yet')}
          />

          <Link title='Click Here to Register' route='Register' navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginHorizontal: 'auto',
    maxWidth: 400,
    position: 'relative',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
