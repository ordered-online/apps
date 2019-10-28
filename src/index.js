import { AppRegistry } from 'react-native';
import { Platform } from 'react-native';
import * as serviceWorker from './serviceWorker';
import App from './App';

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('app'),
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (Platform.OS === 'web') {
  serviceWorker.unregister();
}
