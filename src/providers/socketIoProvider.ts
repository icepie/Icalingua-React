import { io, Socket } from 'socket.io-client';
import Provider from '../types/Provider';
import { getConfig } from './configProvider';

const EXCEPTED_PROTOCOL_VERSION = '1.2.5';

let socket: Socket;

export const attachEvents = () => {

};

export const provider: Provider = {
  async createBot() {
    socket = io(getConfig().server);
  }
};

