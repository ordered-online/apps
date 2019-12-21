import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Button, Input, Text } from '@ordered.online/components';
import { GreateLocation } from '../../store/locations';
import { AntDesign } from '@expo/vector-icons';

export class CreateLocationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Test',
      description: 'Test description',
      address: 'Teststraße 32',
      website: 'www.test.de',
      telephone: '0123456789',
      categories: [],
      tags: [],
    };

    this.createLocation = this.createLocation.bind(this);
  }

  createLocation() {
    const {
      name,
      description,
      address,
      website,
      telephone,
      categories,
      tags,
    } = this.state;
    const data = {
      name,
      description,
      address,
      website,
      telephone,
      categories,
      tags,
    };
    this.props.createLocation(data);
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.fetching && <ActivityIndicator />}
        <Text h4>Please provide details for your location.</Text>
        <Text>{'\n'}</Text>
        <Input
          editable
          maxLength={40}
          placeholder="Name"
          textContentType="organizationName"
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
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
          value={this.state.description}
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
          value={this.state.address}
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
          value={this.state.website}
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
          value={this.state.telephone}
          leftIcon={
            <AntDesign
              name="customerservice"
              size={24}
              color="black"
              style={{ marginRight: 10 }}
            />
          }
        />
        <Button
          title="Create"
          style={{ marginTop: 15 }}
          onPress={() => this.createLocation()}
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
    marginHorizontal: 'auto',
  },
});

const mapStateToProps = state => ({
  fetching: state.locations.fetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createLocation: GreateLocation,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateLocationScreen);
