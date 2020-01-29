const connection =
  window.navigator.connection ||
  window.navigator.mozConnection ||
  window.navigator.webkitConnection;

// Prevent the underlying event handlers from leaking and include additional
// properties available in browsers
const getConnectionInfoObject = () => {
  const result = {
    effectiveType: 'unknown',
    type: 'unknown',
  };
  if (!connection) {
    return result;
  }
  for (const prop in connection) {
    const value = connection[prop];
    if (typeof value !== 'function' && value != null) {
      result[prop] = value;
    }
  }
  return result;
};

const eventType = 'change';
const connectionListeners = [];
const netInfoListeners = [];

/**
 * Navigator online: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
 * Network Connection API: https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation
 */
const NetInfo = {
  addEventListener(handler) {
    if (!connection) {
      console.error(
        'Network Connection API is not supported. Not listening for connection type changes.'
      );
      return () => {};
    }

    const wrappedHandler = () => handler(getConnectionInfoObject());
    netInfoListeners.push([handler, wrappedHandler]);
    connection.addEventListener(eventType, wrappedHandler);
    return () => NetInfo.removeEventListener(eventType, handler);
  },

  removeEventListener(handler) {
    const listenerIndex = netInfoListeners.findIndex(
      pair => pair[0] === handler
    );
    const [, wrappedHandler] = netInfoListeners[listenerIndex];
    connection.removeEventListener(eventType, wrappedHandler);
    netInfoListeners.splice(listenerIndex, 1);
  },

  fetch() {
    console.warn('`fetch` is deprecated. Use `getConnectionInfo` instead.');
    return new Promise((resolve, reject) => {
      try {
        resolve(connection.type);
      } catch (err) {
        resolve('unknown');
      }
    });
  },

  getConnectionInfo() {
    return new Promise((resolve, reject) => {
      resolve(getConnectionInfoObject());
    });
  },

  isConnected: {
    addEventListener(handler) {
      const onlineCallback = () => handler(true);
      const offlineCallback = () => handler(false);
      connectionListeners.push([handler, onlineCallback, offlineCallback]);

      window.addEventListener('online', onlineCallback, false);
      window.addEventListener('offline', offlineCallback, false);

      return {
        remove: () =>
          NetInfo.isConnected.removeEventListener(eventType, handler),
      };
    },

    removeEventListener(handler) {
      const listenerIndex = connectionListeners.findIndex(
        pair => pair[0] === handler
      );

      const [, onlineCallback, offlineCallback] = connectionListeners[
        listenerIndex
      ];

      window.removeEventListener('online', onlineCallback, false);
      window.removeEventListener('offline', offlineCallback, false);

      connectionListeners.splice(listenerIndex, 1);
    },

    fetch() {
      return new Promise((resolve, reject) => {
        try {
          resolve(window.navigator.onLine);
        } catch (err) {
          resolve(true);
        }
      });
    },
  },
};

export default NetInfo;
