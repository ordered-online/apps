import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '@ordered.online/api';
import { Text, Image, ListItem, Icon } from '@ordered.online/components';
import { GetSession } from '../../store/orders';
import { primaryColor } from '../../constants/Colors';

export class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: null,
    };
  }

  async componentDidMount() {
    const { session_code } = this.props.match.params;
    this.props.getSession(session_code);
    const response = await api.getQRCodeBase64(session_code);
    let { base64 } = response;
    if (base64) {
      this.setState({ base64 });
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    return (
      <ListItem
        title={item.name}
        subtitle={item.price}
        topDivider
        bottomDivider
        chevron
      />
    );
  }

  render() {
    const { fetching, sessions, locations, match } = this.props;
    const { session_code, location_id } = match.params;

    const session = sessions[session_code] || null;
    const orders = session.orders ? session.orders : null;
    const data = orders.length ? orders : null;

    const location = locations[location_id] || null;

    const width = Dimensions.get('window').width / 2;
    const height = Dimensions.get('window').height / 2;

    if (fetching) {
      return <ActivityIndicator size="large" color={primaryColor} />;
    }

    return (
      <View style={styles.container}>
        <Icon
          name={
            Platform.OS === 'ios'
              ? 'ios-arrow-round-back'
              : 'md-arrow-round-back'
          }
          type="ionicon"
          color={primaryColor}
          onPress={() =>
            this.props.navigation.navigate(`locations/${location_id}/sessions`)
          }
          containerStyle={{ alignSelf: 'flex-start', margin: 30 }}
        />
        <Text h3>{session.name}</Text>
        <Text h4>{location.name}</Text>
        <Image
          source={{
            uri: `data:image/svg+xml;base64,${this.state.base64}`,
          }}
          style={{ width, height }}
          PlaceholderContent={
            <ActivityIndicator size="large" color={primaryColor} />
          }
        />
        <Text>{session_code}</Text>
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
    alignItems: 'center',
  },
  list: {
    flex: 1,
    marginTop: 25,
  },
});

const mapStateToProps = state => ({
  fetching: state.orders.fetching,
  sessions: state.orders.sessions,
  locations: state.locations.locations,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSession: GetSession,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
