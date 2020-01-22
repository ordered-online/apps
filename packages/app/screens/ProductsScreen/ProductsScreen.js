import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Text, ListItem, Icon } from '@ordered.online/components';

import { GetAllProducts } from '../../store/products';
import { GetLocation } from '../../store/locations';
import { OrderProduct } from '../../store/orders';

import { primaryColor } from '../../constants/Colors';

export class ProductsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:
        'Order Products at ' +
        navigation.getParam('locationName', 'your Location.'),
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

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    const { location_id } = this.props.session;
    if (!location_id) {
      this.props.navigation.navigate('StartSession');
    }
    this.props.getLocation(location_id);
    this.props.getAllProducts(location_id);
  }

  keyExtractor = (item, index) => index.toString();

  renderItem({ item }) {
    const product = this.props.products[item];
    return (
      <ListItem
        title={product.name}
        subtitle={product.description}
        bottomDivider
        chevron
        rightElement={`${product.price} €`}
        leftIcon={
          <Icon
            raised
            reverse
            size={15}
            color={primaryColor}
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
    const { fetching, products, locations, session } = this.props;
    const { location_id } = session;
    const location = locations[location_id] || null;

    const data = [];
    if (products) {
      Object.keys(products).forEach(product_id => {
        if (products[product_id].location_id == location_id) {
          data.push(product_id);
        }
      });
    }

    if (fetching) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {location && (
          <Text h4 h4Style={styles.headline}>
            Products for {location.name}
          </Text>
        )}
        <ScrollView style={{ borderRadius: 25 }}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={data}
            renderItem={this.renderItem}
          />
        </ScrollView>
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
  headline: {
    textAlign: 'center',
    marginVertical: 15,
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
  locations: state.locations.locations,
  session: state.orders.session,
  fetching: state.products.fetching,
  products: state.products.products,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLocation: GetLocation,
      getAllProducts: GetAllProducts,
      orderProduct: OrderProduct,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductsScreen);
