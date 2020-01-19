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
        <View style={styles.backButtonContainer}>
          <Icon
            containerStyle={styles.backButton}
            name={
              Platform.OS === 'ios'
                ? 'ios-arrow-round-back'
                : 'md-arrow-round-back'
            }
            type="ionicon"
            color={primaryColor}
            onPress={() => this.props.navigation.navigate('locations')}
          />
          <Text h4 style={{ color: '#57c75e' }}>
            Back
          </Text>
        </View>
        <Card title={location.name} containerStyle={styles.cardContainer}>
          <View style={styles.actionsContainer}>
            <Button
              type="outline"
              title="Products"
              onPress={() =>
                this.props.navigation.navigate(
                  `locations/${location_id}/products`
                )
              }
            />
            <Button
              type="outline"
              title="Orders"
              onPress={() =>
                this.props.navigation.navigate(
                  `locations/${location_id}/sessions`
                )
              }
            />
            <Button
              type="outline"
              title="Edit"
              onPress={() =>
                this.props.navigation.navigate(`locations/edit/${location_id}`)
              }
            />
          </View>
          <Text style={styles.attributeHeader}>Description:</Text>
          <Text>{location.description}</Text>
          <Text style={styles.attributeHeader}>Address:</Text>
          <Text>{location.address}</Text>
          <Text style={styles.attributeHeader}>Categories:</Text>
          {this.renderBadges(location.categories)}
          <Text style={styles.attributeHeader}>Tags:</Text>
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
  attributeHeader: {
    marginTop: 12,
    fontWeight: '600',
  },
  cardContainer: {
    marginBottom: 24,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 64,
    elevation: 0.5,
  },
  actionsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  backButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  badgeContainer: {
    flex: 1 / 5,
    borderRadius: 20,
    backgroundColor: '#57c75e',
    marginVertical: 6,
  },
  badgeText: {
    textAlign: 'center',
    paddingVertical: 5,
    color: 'white',
  },
  backButton: {
    marginHorizontal: 16,
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
