import { SOCKET_SERVER } from 'config/config.json';
import { IRiderSocketLocation } from 'interface/RiderControlMap';
import io from 'socket.io-client';
class DriverSocket {
  private static instance: DriverSocket;

  socket!: SocketIOClient.Socket;
  handleRiderLocation: any;

  private constructor() {}

  static getInstance(uiHandler: (data: IRiderSocketLocation) => void) {
    if (!DriverSocket.instance) {
      DriverSocket.instance = new DriverSocket();
      DriverSocket.instance.socket = io(`${SOCKET_SERVER}/driver`, {
        transports: ['websocket'],
        query: {
          'x-access-token':
            localStorage.getItem('x-access-token') ||
            sessionStorage.getItem('x-access-token'),
        },
      });

      DriverSocket.instance.socket.connect();
      DriverSocket.instance.socket.on('read-driver-location', (data: any) => {
        uiHandler(data);
      });

      console.log('connected');
    }

    return DriverSocket.instance;
  }
}

export default DriverSocket;
