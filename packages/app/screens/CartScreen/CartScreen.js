import React, { Component, useState } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, ListItem, Icon, Button } from '@ordered.online/components';

import { GetProduct } from '../../store/products';
import { OrderProduct, GetSession, CloseSession } from '../../store/orders';

import Colors from '../../constants/Colors';

export class CartScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Orders',
      headerStyle: {
        backgroundColor: '#f8f8f8',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      },
      headerTintColor: '#57c75e',
      headerTitleStyle: {
        fontWeight: '600',
      },
      headerRight: () => {
        const total = parseFloat(
          navigation.getParam('total', 'default')
        ).toFixed(2);

        if (total !== 'default') {
          return <Text style={styles.total}>{`€ ${total}`}</Text>;
        }
        return null;
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.renderItem = this.renderItem.bind(this);
    this.closeSession = this.closeSession.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      fetchingProducts,
      products,
      fetchingSession,
      session,
      total,
      navigation,
    } = nextProps;

    if (!fetchingProducts && !fetchingSession && session) {
      let data = {},
        total = 0;
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
      if (total !== nextProps.navigation.getParam('total', '')) {
        navigation.setParams({ total });
      }
      if (data != prevState.data) {
        return { ...prevState, data };
      }
    }
    return null;
  }

  componentDidMount() {
    const { session } = this.props;
    if (session) {
      this.props.getSession(session.code);
    }
  }

  closeSession() {
    const { code } = this.props.session;
    this.props.closeSession(code);
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
        leftIcon={
          <Icon
            raised
            reverse
            size={15}
            color={Colors.primaryColor}
            disabled={this.props.session.state === 'CLOSED'}
            containerStyle={styles.iconContainer}
            name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
            type="ionicon"
            onPress={() => this.props.orderProduct({ product_id: item })}
          />
        }
      />
    );
  }

  render() {
    const { fetchingProducts, fetchingSession, session } = this.props;

    const fetching = fetchingProducts || fetchingSession;

    if (!session) {
      return (
        <View style={styles.container}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text h4>There are no orders in your basket</Text>
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              raised
              titleStyle={{ color: '#fff', width: '100%' }}
              title="Start Your Order"
              onPress={() => this.props.navigation.navigate('StartSession')}
            />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {fetching ? (
          <ActivityIndicator
            size="large"
            color={Colors.primaryColor}
            style={{ marginTop: 14 }}
          />
        ) : (
          <View style={{ height: 50 }} />
        )}
        <FlatList
          style={{ borderRadius: 24 }}
          keyExtractor={this.keyExtractor}
          data={Object.keys(this.state.data)}
          renderItem={this.renderItem}
        />
        <View style={styles.buttonWrapper}>
          <Button
            raised
            disabled={session.state === 'CLOSED'}
            titleStyle={{ color: '#fff', width: '100%' }}
            title="Close your Order"
            onPress={() => this.closeSession()}
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
    alignItems: 'stretch',
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
    marginVertical: 15,
  },
  total: {
    color: '#57c75e',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
    marginRight: 30,
  },
  iconContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginRight: 5,
    marginLeft: -10,
  },
});

const mapStateToProps = state => ({
  total: state.orders.total,
  session: state.orders.session,
  fetchingSession: state.orders.fetching,
  products: state.products.products,
  fetchingProducts: state.products.fetching,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      orderProduct: OrderProduct,
      getSession: GetSession,
      getProduct: GetProduct,
      closeSession: CloseSession,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
