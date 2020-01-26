import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import api from '@ordered.online/api';
import { Text, ListItem, Icon, QRCode } from '@ordered.online/components';
import { GetProduct } from '../../store/products';
import { GetSession, ConnectSession } from '../../store/orders';
import Colors from '../../constants/Colors';

export class OrderDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
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
      return <ActivityIndicator size="large" color={Colors.primaryColor} />;
    }

    return (
      <View style={styles.container}>
        <Icon
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          type="ionicon"
          color={Colors.primaryColor}
          onPress={() =>
            this.props.navigation.navigate(`locations/${location_id}/sessions`)
          }
          iconStyle={styles.backButton}
          containerStyle={styles.iconContainer}
        />
        <Text h3 style={{ textAlign: 'center' }}>
          {session.name}
        </Text>
        <Text style={{ marginVertical: 4, textAlign: 'center' }} h4>
          {location.name}
        </Text>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <QRCode value={session_code} size={200} />
        </View>
        <Text style={styles.total}>{`€ ${total}`}</Text>
        <Text style={{ textAlign: 'center' }}>{session_code}</Text>
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
    marginTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  listView: {
    marginTop: 4,
    flex: 1,
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
  backButton: {
    fontSize: 30,
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
    top: 10,
    left: 10,
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
