import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GetSessions, CreateSession } from '../../store/orders';
import { Icon, Text, ListItem, Input } from '@ordered.online/components';

import { primaryColor } from '../../constants/Colors';

export class OrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderName: '',
    };
    this.renderItem = this.renderItem.bind(this);
    this.createNewSession = this.createNewSession.bind(this);
  }

  componentDidMount() {
    const { location_id } = this.props.match.params;
    this.props.getSessions({ location_id });
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const { location_id } = this.props.match.params;
    const session = this.props.sessions[item];
    return (
      <ListItem
        title={session.name}
        subtitle={session.state}
        onPress={() =>
          this.props.navigation.navigate(
            `locations/${location_id}/sessions/${item}`
          )
        }
        topDivider
        bottomDivider
        chevron
      />
    );
  }

  createNewSession() {
    const { location_id } = this.props.match.params;
    const { orderName } = this.state;
    this.props
      .dispatch(
        CreateSession({
          location_id,
          name: orderName,
        })
      )
      .then(
        this.props.navigation.navigate(`locations/${location_id}/sessions`)
      );
  }

  render() {
    const { fetching, locations, sessions, match } = this.props;
    const { location_id } = match.params;
    const location = locations[location_id];

    const data = sessions ? Object.keys(sessions) : null;

    if (!location) {
      return (
        <View style={styles.container}>
          <Text>Uuups, you were never here !</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text h3 h3Style={styles.headline}>
          Orders for {location.name}
        </Text>
        <View style={styles.form}>
          <Input
            editable
            maxLength={40}
            placeholder="Enter a name for the order to get started"
            textContentType="none"
            onChangeText={orderName => this.setState({ orderName })}
            value={this.state.orderName}
            containerStyle={styles.input}
          />
          <Icon
            name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            type="ionicon"
            color={primaryColor}
            onPress={this.createNewSession}
            containerStyle={styles.icon}
          />
        </View>
        {fetching && <ActivityIndicator size="large" color={primaryColor} />}

        <FlatList
          keyExtractor={this.keyExtractor}
          data={data}
          renderItem={this.renderItem}
          style={styles.list}
        />
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
  headline: {
    textAlign: 'center',
    marginVertical: 15,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    width: 50,
  },
  input: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop: 25,
  },
});

const mapStateToProps = state => ({
  locations: state.locations.locations,
  fetching: state.orders.fetching,
  sessions: state.orders.sessions,
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      getSessions: GetSessions,
    },
    dispatch
  ),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersScreen);
