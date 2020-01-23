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
import { GetProduct } from '../../store/products';
import { GetSession, ConnectSession } from '../../store/orders';
import { primaryColor } from '../../constants/Colors';

export class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      base64: null,
    };
    this.renderItem = this.renderItem.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { fetching, products, sessions } = nextProps;
    const { session_code } = nextProps.match.params;
    if (!fetching && session_code) {
      let data = {},
        total = 0;
      const session = sessions[session_code];
      const { orders = [] } = session;
      if (orders && Array.isArray(orders)) {
        orders.forEach(order => {
          const { product_id } = order;
          if (products.hasOwnProperty(product_id)) {
            if (data.hasOwnProperty(product_id)) {
              data[product_id]++;
            } else {
              data[product_id] = 1;
            }
            total += parseFloat(products[product_id].price);
          } else {
            nextProps.getProduct(product_id);
          }
        });
      }
      if (data != prevState.data || total != prevState.total) {
        return { ...prevState, data, total, session };
      }
    }
    return null;
  }

  async componentDidMount() {
    const { session_code } = this.props.match.params;
    this.props.getSession(session_code);
    this.props.connectSession(session_code);
    const response = await api.getQRCodeBase64(session_code);
    let { base64 } = response;
    if (base64) {
      this.setState({ base64 });
    }
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const product = this.props.products[item];
    const amount = this.state.data[item];
    return (
      <ListItem
        title={product.name}
        subtitle={product.description}
        bottomDivider
        chevron
        rightElement={`${amount} x ${product.price} €`}
        disabled={this.state.session.state === 'CLOSED'}
      />
    );
  }

  render() {
    const { fetching, sessions, locations, match } = this.props;
    const { session_code, location_id } = match.params;

    const session = sessions[session_code] || null;
    const location = locations[location_id] || null;

    const total = this.state.total.toFixed(2);

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
          containerStyle={{ alignSelf: 'flex-start', marginLeft: 30 }}
        />
        <Text h3>{session.name}</Text>
        <Text style={{ marginVertical: 4 }} h4>
          {location.name}
        </Text>
        <Image
          source={{
            uri: `data:image/svg+xml;base64,${this.state.base64}`,
          }}
          style={{ width: 300, height: 300 }}
          PlaceholderContent={
            <ActivityIndicator size="large" color={primaryColor} />
          }
        />
        <Text style={styles.total}>{`€ ${total}`}</Text>
        <Text>{session_code}</Text>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={Object.keys(this.state.data)}
          renderItem={this.renderItem}
          style={styles.listView}
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
  listView: {
    marginTop: 4,
    width: '100%',
    borderRadius: 24,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 64,
    elevation: 0.5,
  },
  total: {
    marginVertical: 4,
    color: '#57c75e',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
  },
});

const mapStateToProps = state => ({
  fetching: state.orders.fetching,
  sessions: state.orders.sessions,
  locations: state.locations.locations,
  products: state.products.products,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getSession: GetSession,
      connectSession: ConnectSession,
      getProduct: GetProduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailScreen);
