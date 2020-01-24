import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { Button, Input, Text, Map, Icon } from '@ordered.online/components';
import {
  GreateLocation,
  GetLocation,
  EditLocation,
} from '../../store/locations';
import api from '@ordered.online/api';

import { primaryColor } from '../../constants/Colors';

export class LocationEditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      address: '',
      latitude: '',
      longitude: '',
      website: '',
      telephone: '',
      categories: [],
      tags: [],
      typing: false,
      typingTimeout: 0,
      confirmedLocation: false,
      region: null,
      marker: null,
      fetching: props.edit ? true : false,
    };

    this.updateStateAfterFetch = this.updateStateAfterFetch.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.changeLocationAddress = this.changeLocationAddress.bind(this);
    this.geocodeAdress = this.geocodeAdress.bind(this);
  }

  componentDidMount() {
    if (this.props.edit) {
      const location_id = this.props.match.params.id;
      this.props
        .dispatch(GetLocation(location_id))
        .then(this.updateStateAfterFetch);
    }
  }

  componentWillUnmount() {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }
  }

  updateStateAfterFetch() {
    const location_id = this.props.match.params.id;
    const location = this.props.locations[location_id];
    if (location) {
      const {
        name,
        description,
        address,
        latitude,
        longitude,
        website,
        telephone,
        categories,
        tags,
      } = location;
      this.setState({
        name,
        description,
        address,
        latitude,
        longitude,
        website,
        telephone,
        categories,
        tags,
        region: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        marker: {
          coordinate: {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
          title: name,
          description: description,
        },
      });
    }
  }

  handleFormChange(key, value) {
    if (key === 'address') {
      this.changeLocationAddress(value);
    } else {
      const marker = this.state.marker;

      if (marker) {
        marker.title = key === 'name' ? value : this.state.name;
        marker.description =
          key === 'description' ? value : this.state.description;
      }

      this.setState({
        [key]: value,
        marker,
      });
    }
  }

  changeLocationAddress(address) {
    if (this.state.typingTimeout) {
      clearTimeout(this.state.typingTimeout);
    }

    this.setState({
      address: address,
      typing: false,
      typingTimeout: setTimeout(this.geocodeAdress, 2000),
    });
  }

  async geocodeAdress() {
    const address = this.state.address;

    const geocodedLocations = await api.geocodeLocation({ address });

    if (__DEV__) {
      console.log(geocodedLocations);
    }

    if (geocodedLocations.length) {
      const geocodedLocation = geocodedLocations[0];

      if (__DEV__) {
        console.log(geocodedLocation);
      }

      const latitude = parseFloat(geocodedLocation.lat);
      const longitude = parseFloat(geocodedLocation.lon);

      this.setState({
        latitude: latitude,
        longitude: longitude,
        region: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        marker: {
          coordinate: {
            latitude: latitude,
            longitude: longitude,
          },
          title: this.state.name,
          description: this.state.description,
        },
      });
    }
  }

  handleFormSubmit() {
    const {
      name,
      description,
      address,
      latitude,
      longitude,
      website,
      telephone,
      categories,
      tags,
    } = this.state;
    const data = {
      name,
      description,
      address,
      latitude,
      longitude,
      website,
      telephone,
      categories,
      tags,
    };

    if (this.props.edit) {
      const location_id = this.props.match.params.id;
      this.props.editLocation(location_id, data);
    } else {
      this.props.createLocation(data);
    }
  }

  render() {
    const location_id = this.props.match.params.id;
    const { edit, fetching } = this.props;

    if (edit && fetching) {
      return <ActivityIndicator size="large" color={primaryColor} />;
    }

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.backButtonContainer}>
            <Icon
              containerStyle={styles.backButton}
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
              type="ionicon"
              color={primaryColor}
              onPress={() =>
                this.props.navigation.navigate(`locations/${location_id}`)
              }
            />
          </View>
          <Map
            mapStyle={styles.mapViewWrapper}
            region={this.state.region}
            marker={this.state.marker}
          />
          <Text h4 style={{ textAlign: 'center' }}>
            Please provide details for your location.{'\n\n'}
          </Text>
          <Input
            editable
            maxLength={40}
            placeholder="Name"
            textContentType="organizationName"
            value={this.state.name}
            onChangeText={name => this.handleFormChange('name', name)}
          />
          <Input
            editable
            autoFocus
            multiline
            maxLength={400}
            placeholder="Description"
            textContentType="none"
            onChangeText={description =>
              this.handleFormChange('description', description)
            }
            value={this.state.description}
          />
          <Input
            editable
            autoFocus
            maxLength={40}
            placeholder="Address"
            textContentType="fullStreetAddress"
            onChangeText={address => this.handleFormChange('address', address)}
            value={this.state.address}
          />
          <Input
            editable
            autoFocus
            maxLength={40}
            placeholder="Website"
            textContentType="URL"
            onChangeText={website => this.handleFormChange('website', website)}
            value={this.state.website}
          />
          <Input
            editable
            autoFocus
            maxLength={40}
            placeholder="Telephone"
            textContentType="telephoneNumber"
            onChangeText={telephone =>
              this.handleFormChange('telephone', telephone)
            }
            value={this.state.telephone}
          />
          <Button
            raised
            color={'#57c75e'}
            titleStyle={{ color: '#fff', padding: 4 }}
            title={edit ? 'Save Location' : 'Create Location'}
            style={{ marginTop: 24 }}
            loading={this.props.fetching}
            onPress={this.handleFormSubmit}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  mapViewWrapper: {
    height: 300,
    width: '100%',
    marginVertical: 24,
  },
  backButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  backButton: {
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 64,
    elevation: 0.5,
    width: 30,
    height: 30,
    borderRadius: 12,
  },
});

const mapStateToProps = state => ({
  fetching: state.locations.fetching,
  locations: state.locations.locations,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      createLocation: GreateLocation,
      editLocation: EditLocation,
    },
    dispatch
  ),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationEditScreen);
