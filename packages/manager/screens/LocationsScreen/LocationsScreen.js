import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Text, ListItem } from '@ordered.online/components';
import { GetAllLocations } from '../../store/locations';

import { primaryColor } from '../../constants/Colors';

export class LocationsScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.props.getAllLocations();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const location = this.props.locations[item];
    return (
      <ListItem
        title={location.name}
        subtitle={location.description}
        onPress={() => this.props.navigation.navigate(`locations/${item}`)}
        topDivider
        bottomDivider
        chevron
      />
    );
  }

  render() {
    const { fetching, locations } = this.props;

    const data = Object.keys(locations) || null;

    return (
      <View style={styles.container}>
        <Text h3 h3style={styles.headline}>
          Your Locations
        </Text>
        {fetching && <ActivityIndicator size="large" color={primaryColor} />}
        <FlatList
          style={styles.listView}
          keyExtractor={this.keyExtractor}
          data={data}
          renderItem={this.renderItem}
        />
        <View style={styles.createButtonWrapper}>
          <Button
            raised
            titleStyle={{ color: '#fff', width: '100%' }}
            title="+ Create new Location"
            onPress={() => this.props.navigation.navigate('locations/create')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  listView: {
    marginHorizontal: 12,
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 64,
    elevation: 0.5,
  },
  headline: {
    textAlign: 'center',
    marginVertical: 12,
  },
  createButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const mapStateToProps = state => ({
  fetching: state.locations.fetching,
  locations: state.locations.locations,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllLocations: GetAllLocations,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationsScreen);
