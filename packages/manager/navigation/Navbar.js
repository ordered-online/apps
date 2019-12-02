import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { Link } from './routing';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';

const protectedRoutes = [
  {
    path: '/overview',
    title: 'Overview',
  },
  {
    path: '/logout',
    title: 'Logout',
  },
];
const publicRoutes = [
  {
    path: '/login',
    title: 'Login',
  },
  {
    path: '/register',
    title: 'Register',
  },
];

class Navbar extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  render() {
    const { loggedIn, onIconPress } = this.props;
    const { isSmallDevice } = Layout;
    const { primaryColor } = Colors;

    let routes = publicRoutes;
    if (loggedIn) {
      routes = protectedRoutes;
    }

    const navbarStyles = [styles.navbar];
    if (!isSmallDevice) {
      navbarStyles.push({ justifyContent: 'space-between' });
    }
    const navLinkStyles = [styles.navLink];
    navLinkStyles.push({ backgroundColor: primaryColor });

    const navbarLinks = routes.map((screen, i) => {
      return (
        <View key={i} style={navLinkStyles}>
          <Link
            to={screen.path}
            style={{
              textDecoration: 'none',
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Text style={styles.navItem}>{screen.title}</Text>
          </Link>
        </View>
      );
    });

    return (
      <View style={navbarStyles}>
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={() => onIconPress && onIconPress()}>
            <Ionicons
              name={
                Platform.OS === 'ios'
                  ? 'ios-arrow-round-back'
                  : 'md-arrow-round-back'
              }
              size={30}
              style={styles.icon}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.navigationWrapper}>
          <View style={styles.navigation}>{navbarLinks}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navbar: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 1,
  },
  iconWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 30,
  },
  navigationWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  navigation: {
    maxWidth: 375,
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
  },
  navLink: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    textAlign: 'center',
    fontSize: 18,
    color: '#ffffff',
  },
});

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
});

export default connect(mapStateToProps, null)(Navbar);
