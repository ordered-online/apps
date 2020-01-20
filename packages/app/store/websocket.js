export const SESSION_CONNECT = 'WEBSOCKET/SESSION_CONNECT';
export const SESSION_CONNECTED = 'WEBSOCKET/SESSION_CONNECTED';
export const SESSION_DISCONNECT = 'WEBSOCKET/SESSION_DISCONNECT';
export const SESSION_DISCONNECTED = 'WEBSOCKET/SESSION_DISCONNECTED';
export const SESSION_MESSAGE = 'WEBSOCKET/SESSION_MESSAGE';

export const sessionConnect = host => ({
  type: SESSION_CONNECT,
  payload: host,
});

export const sessionConnected = host => ({
  type: SESSION_CONNECTED,
  payload: host,
});

export const sessionDisconnect = () => ({
  type: SESSION_DISCONNECT,
});

export const sessionDisconnected = () => ({
  type: SESSION_DISCONNECTED,
});

export const sessionMessage = message => ({
  type: SESSION_MESSAGE,
  payload: message,
});

export default function websocketMiddleware() {
  let socket = null;

  const onOpen = store => event => {
    console.log('websocket open', event.target.url);
    store.dispatch(sessionConnected(event.target.url));
  };

  const onClose = store => event => {
    store.dispatch(sessionDisconnected(event));
  };

  const onMessage = store => event => {
    cstore.dispatch(sessionMessage(event.data));
  };

  return store => next => action => {
    switch (action.type) {
      case SESSION_CONNECT:
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        console.log('create new wocksocket on: ' + action.payload.host);
        socket = new WebSocket(action.payload.host);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case SESSION_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log('websocket closed');
        break;
      default:
        console.log('the next action:', action);
        return next(action);
    }
  };
}
