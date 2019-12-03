import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Input } from '@ordered.online/components';
import { FindLocation } from '../../store/locations';

export class CreateLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      address: '',
      website: '',
      telephone: '',
      categories: [],
      tags: [],
    };

    this.createLocation = this.createLocation.bind(this);
  }

  createLocation() {}

  render() {
    return (
      <View style={styles.container}>
        {this.props.fetching && <ActivityIndicator />}
        <Text>Please provide details for your location.</Text>
        <Input
          editable
          maxLength={40}
          placeholder="Name"
          textContentType="organizationName"
          onChangeText={name => this.setState({ name })}
          style={{ textAlign: 'center' }}
        />
        <Input
          editable
          maxLength={400}
          placeholder="Description"
          textContentType="none"
          onChangeText={description => this.setState({ description })}
          style={{ textAlign: 'center' }}
        />
        <Input
          editable
          maxLength={40}
          placeholder="Address"
          textContentType="fullStreetAddress"
          onChangeText={address => this.setState({ address })}
          style={{ textAlign: 'center' }}
        />
        <Input
          editable
          maxLength={40}
          placeholder="Website"
          textContentType="url"
          onChangeText={website => this.setState({ website })}
          style={{ textAlign: 'center' }}
        />
        <Input
          editable
          maxLength={40}
          placeholder="Telephone"
          textContentType="telephoneNumber"
          onChangeText={telephone => this.setState({ telephone })}
          style={{ textAlign: 'center' }}
        />
        <Button
          color="#57c75e"
          title="Create"
          onPress={() => console.warn('Create Location is not implemented yet')}
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

const mapStateToProps = state => ({
  userId: state.authentication.userId,
  fetching: state.authentication.fetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLocations: FindLocation,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLocationScreen);
