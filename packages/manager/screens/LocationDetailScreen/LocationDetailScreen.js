import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Text, Icon, Button } from '@ordered.online/components';
import { GetLocation } from '../../store/locations';
import Colors from '../../constants/Colors';

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
        <Card
          title={location.name}
          containerStyle={styles.cardContainer}
          titleLeftElement={
            <Icon
              name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
              type="ionicon"
              color={Colors.primaryColor}
              onPress={() => this.props.navigation.navigate(`locations`)}
              iconStyle={{ fontSize: 35 }}
            />
          }>
          <View style={styles.actionsContainer}>
            <Button
              type="outline"
              title="Products"
              containerStyle={styles.action}
              onPress={() =>
                this.props.navigation.navigate(
                  `locations/${location_id}/products`
                )
              }
            />
            <Button
              type="outline"
              title="Orders"
              containerStyle={styles.action}
              onPress={() =>
                this.props.navigation.navigate(
                  `locations/${location_id}/sessions`
                )
              }
            />
            <Button
              type="outline"
              title="Edit"
              containerStyle={styles.action}
              onPress={() =>
                this.props.navigation.navigate(`locations/edit/${location_id}`)
              }
            />
          </View>
          <Text style={styles.attributeHeader}>Description:</Text>
          <Text>{location.description}</Text>
          <Text style={styles.attributeHeader}>Address:</Text>
          <Text>{location.address}</Text>
          {location.categories.length > 0 && (
            <Text style={styles.attributeHeader}>Categories:</Text>
          )}
          {this.renderBadges(location.categories)}
          {location.tags.length > 0 && (
            <Text style={styles.attributeHeader}>Tags:</Text>
          )}
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
  attributeHeader: {
    marginTop: 12,
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
    marginBottom: 24,
    borderRadius: 24,
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
  action: {
    flex: 1,
    marginHorizontal: 5,
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
    fontSize: 40,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 64,
    elevation: 0.5,
    width: 30,
    height: 30,
    borderRadius: 12,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
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
