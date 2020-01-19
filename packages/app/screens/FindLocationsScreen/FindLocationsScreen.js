import React, { Component } from 'react';
import {
  View,
  Platform,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { primaryColor } from '../../constants/Colors';

import { ListItem, Input, Icon, Text } from '@ordered.online/components';

import { FindLocations, FindLocationsNearby } from '../../store/locations';

export class FindLocationsScreen extends Component {
  static navigationOptions = {
    title: 'Find a location',
  };

  constructor(props) {
    super(props);
    this.state = {
      modalLocation: null,
      modalOpen: false,
      search: '',
      typing: false,
      coordinates: null,
      errorMessage: null,
      hasPermissions: false,
    };

    this.getLocationPermissions = this.getLocationPermissions.bind(this);
    this.getLocation = this.getLocation.bind(this);

    this.findLocations = this.findLocations.bind(this);
    this.findLocationsNearby = this.findLocationsNearby.bind(this);

    this.renderItem = this.renderItem.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    }
  }

  async getLocationPermissions() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    } else {
      this.setState({ hasPermissions: true });
    }
  }

  async getLocation() {
    if (!this.state.hasPermissions) {
      await this.getLocationPermissions();
    }
    const coordinates = await Location.getCurrentPositionAsync();
    this.setState({ coordinates });
    return coordinates;
  }

  findLocations() {
    this.props.findLocations({ name: this.state.search });
  }

  async findLocationsNearby() {
    const coordinates = await this.getLocation();
    this.props.findLocations({ coordinates });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const location = this.props.locations[item];
    return (
      <ListItem
        title={location.name}
        subtitle={location.description}
        onPress={() =>
          this.props.navigation.navigate('LocationDetails', {
            location_id: item,
            title: location.name,
          })
        }
        topDivider
        bottomDivider
        chevron
      />
    );
  }

  clearSearch() {
    this.setState({ search: '' });
  }

  render() {
    const { fetching, locations } = this.props;

    const data = Object.keys(locations) || null;

    const searchIcon = Platform.OS === 'ios' ? 'ios-search' : 'md-search';
    const locationIcon = Platform.OS === 'ios' ? 'ios-pin' : 'md-pin';
    const clearIcon = Platform.OS === 'ios' ? 'ios-close' : 'md-close';

    return (
      <View style={styles.container}>
        <Input
          editable
          onFocus={() => {
            this.setState({ typing: true });
          }}
          onBlur={() => {
            setTimeout(() => this.setState({ typing: false }), 100);
          }}
          maxLength={40}
          placeholder="Search ..."
          value={this.state.search}
          onChangeText={search => this.setState({ search })}
          containerStyle={{ marginBottom: 30 }}
          leftIcon={
            <Icon
              name={searchIcon}
              type="ionicon"
              onPress={this.findLocations}
            />
          }
          rightIcon={
            <Icon
              type="ionicon"
              name={this.state.typing ? clearIcon : locationIcon}
              onPress={
                this.state.typing ? this.clearSearch : this.findLocationsNearby
              }
            />
          }
        />
        {fetching ? (
          <ActivityIndicator size="large" color={primaryColor} />
        ) : (
          <FlatList
            keyExtractor={this.keyExtractor}
            data={data}
            renderItem={this.renderItem}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

const mapStateToProps = state => ({
  fetching: state.locations.fetching,
  locations: state.locations.locations,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      findLocations: FindLocations,
      findLocationsNearby: FindLocationsNearby,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindLocationsScreen);
