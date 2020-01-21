import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Text, Icon, Button, Map } from '@ordered.online/components';
import { GetLocation } from '../../store/locations';
import { primaryColor } from '../../constants/Colors';

export class LocationDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Location Details'),
      headerStyle: {
        backgroundColor: '#f8f8f8',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      },
      headerTintColor: '#57c75e',
      headerTitleStyle: {
        fontWeight: '600',
      },
    };
  };

  componentDidMount() {
    const location_id = this.props.navigation.getParam('location_id', -1);
    if (location_id > -1) {
      this.props.getLocation(location_id);
    } else {
      this.props.navigation.navigate('Locations');
    }
  }

  renderBadges(items) {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        {items.map((item, index) => (
          <View key={index} style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{item.name}</Text>
          </View>
        ))}
      </View>
    );
  }

  render() {
    const location_id = this.props.navigation.getParam('location_id', -1);
    if (location_id < 0) {
      this.props.navigation.navigate('Locations');
    }

    const location = this.props.locations[location_id];

    if (!location) {
      this.props.navigation.navigate('Locations');
    }

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

    const region = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    const marker = {
      coordinate: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
      title: name,
      description: description,
    };

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Map region={region} marker={marker} />
        <View style={styles.contentContainer}>
          <Text h2>{location.name}</Text>
          <Text style={styles.textContent}>{location.description}</Text>
          <Text>{location.address}</Text>
          {location.categories.length > 0 && (
            <Text style={styles.textContent}>Categories: {'\n'}</Text>
          )}
          {this.renderBadges(location.categories)}
          {location.categories.tags > 0 && (
            <Text style={styles.textContent}>Tags: {'\n'}</Text>
          )}
          {this.renderBadges(location.tags)}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  contentContainer: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 'auto',
  },
  textContent: {
    marginVertical: 15,
  },
  badgeContainer: {
    flex: 1 / 3,
    borderRadius: 20,
    backgroundColor: '#57c75e',
    margin: 5,
  },
  badgeText: {
    textAlign: 'center',
    paddingVertical: 5,
    color: 'white',
  },
});

const mapStateToProps = state => ({
  locations: state.locations.locations,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLocation: GetLocation,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationDetailScreen);
