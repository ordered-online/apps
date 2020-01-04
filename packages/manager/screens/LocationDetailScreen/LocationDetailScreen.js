import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Text, Icon, Button } from '@ordered.online/components';
import { GetLocation } from '../../store/locations';
import { primaryColor } from '../../constants/Colors';

export class LocationDetailScreen extends Component {
  componentDidMount() {
    const location_id = this.props.match.params.id;
    this.props.getLocation(location_id);
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
    const location_id = this.props.match.params.id;
    const location = this.props.locations[location_id];

    if (!location) {
      return (
        <View style={styles.container}>
          <Text>Uuups, you were never here !</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.actionsContainer}>
          <Icon
            name={
              Platform.OS === 'ios'
                ? 'ios-arrow-round-back'
                : 'md-arrow-round-back'
            }
            type="ionicon"
            color={primaryColor}
            onPress={() => this.props.navigation.navigate('locations')}
          />
          <Button
            type="clear"
            title="Products"
            onPress={() =>
              this.props.navigation.navigate(
                `locations/${location_id}/products`
              )
            }
          />
          <Button
            type="clear"
            title="Orders"
            onPress={() =>
              this.props.navigation.navigate(
                `locations/${location_id}/sessions`
              )
            }
          />
          <Icon
            name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
            type="ionicon"
            color={primaryColor}
            onPress={() =>
              this.props.navigation.navigate(`locations/edit/${location_id}`)
            }
          />
        </View>
        <Card title={location.name} containerStyle={styles.cardContainer}>
          <Text style={{ marginBottom: 15 }}>
            {'\n'} Description: {'\n'} {location.description}
          </Text>
          <Text>
            {'\n'} Address: {'\n'} {location.address}
          </Text>
          <Text>
            {'\n'} Latitude: {'\n'} {location.latitude}
          </Text>
          <Text>
            {'\n'} Longitude: {'\n'} {location.longitude}
          </Text>
          <Text>
            {'\n'} Categories: {'\n'}
          </Text>
          {this.renderBadges(location.categories)}
          <Text>
            {'\n'} Tags: {'\n'}
          </Text>
          {this.renderBadges(location.tags)}
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  cardContainer: {
    flex: 1,
  },
  actionsContainer: {
    margin: 25,
    marginBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
