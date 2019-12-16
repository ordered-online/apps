import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@ordered.online/components';
import { GetLocation } from '../../store/locations';
import { AntDesign } from '@expo/vector-icons';

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
        <Text h4>Please provide details for your location.</Text>
        <Input
          editable
          maxLength={40}
          placeholder="Name"
          textContentType="organizationName"
          onChangeText={name => this.setState({ name })}
          leftIcon={
            <AntDesign
              name="trademark"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Input
          editable
          maxLength={400}
          placeholder="Description"
          textContentType="none"
          onChangeText={description => this.setState({ description })}
          leftIcon={
            <AntDesign
              name="edit"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Input
          editable
          maxLength={40}
          placeholder="Address"
          textContentType="fullStreetAddress"
          onChangeText={address => this.setState({ address })}
          leftIcon={
            <AntDesign
              name="enviromento"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Input
          editable
          maxLength={40}
          placeholder="Website"
          textContentType="url"
          onChangeText={website => this.setState({ website })}
          leftIcon={
            <AntDesign
              name="cloudo"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Input
          editable
          maxLength={40}
          placeholder="Telephone"
          textContentType="telephoneNumber"
          onChangeText={telephone => this.setState({ telephone })}
          leftIcon={
            <AntDesign
              name="customerservice"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Button title="Create" onPress={() => this.createLocation()} />
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
      getLocations: GetLocation,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLocationScreen);
