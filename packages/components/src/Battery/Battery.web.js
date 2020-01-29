import { NativeEventEmitter, NativeModules } from 'react-native';
const deviceInfoEmitter = new NativeEventEmitter(NativeModules.RNDeviceInfo);

// Note: The Web Battery API is deprecated and soon to be removed.
// Though, it still supports a large number of browsers, incl. Chrome (Web & Mobile) and Samsung Internet, which is sufficient for now ...
// see: developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API

const connection =
  window.navigator.connection ||
  window.navigator.mozConnection ||
  window.navigator.webkitConnection;

const getBatteryLevel = async () => {
  if (typeof window.navigator.getBattery !== 'undefined') {
    const battery = await window.navigator.getBattery();
    return battery.level;
  }
  return new Promise((resolve, reject) => {
    resolve('unknown');
  });
};

const eventTypes = {
  batteryLevel: 'RNDeviceInfo_batteryLevelDidChange',
  batteryLevelIsLow: 'RNDeviceInfo_batteryLevelIsLow',
  powerState: 'RNDeviceInfo_powerStateDidChange',
};

const addEventListener = (type, handler) => {
  const event = eventTypes[type] || null;
  if (event) {
    if (typeof window.navigator.getBattery !== 'undefined') {
      const wrappedHandler = battery =>
        battery.addEventListener('levelchange', handler);

      window.navigator.getBattery().then(wrappedHandler);

      const remove = () => battery.removeEventListener('levelchange', handler);

      return { remove };
    } else {
      console.error(
        'Battery API is not supported in your Browser. Not listening for battery changes.'
      );
    }
  } else {
    console.error(
      'Event type is not supported. Not listening for battery changes.'
    );
  }
};

// expo-battery compatibility
const getBatteryLevelAsync = getBatteryLevel;
const addBatteryLevelListener = handler =>
  addEventListener('batteryLevel', handler);

export default {
  addEventListener,
  getBatteryLevel,
  getBatteryLevelAsync,
  addBatteryLevelListener,
};
