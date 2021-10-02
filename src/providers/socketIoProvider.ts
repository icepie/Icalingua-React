import { Modal, notification } from 'antd';
import { sign } from 'noble-ed25519';
import { useHistory, useLocation } from 'react-router';
import { io, Socket } from 'socket.io-client';
import BridgeVersionInfo from '../types/BridgeVersionInfo';
import Provider from '../types/Provider';
import { getConfig } from './configProvider';

const EXCEPTED_PROTOCOL_VERSION = '1.2.5';

let socket: Socket;
let bridgeVersion: BridgeVersionInfo;
let login: boolean = false;

export const attachSocketEvents = () => {

};

export const provider: Provider = {
  createBot: async () => {
    socket = io(getConfig().server, {transports: ['websocket']});
    socket.once('connect_error', async (err) => {
      notification.error({message: '与服务器连接失败', description: err});
      return false;
    });

    // 验证身份
    socket.on('requireAuth', async (salt: string, version: BridgeVersionInfo) => {
      bridgeVersion = version;

      if (version.protocolVersion !== EXCEPTED_PROTOCOL_VERSION) {
        Modal.confirm({
          title: '提示',
          content: `当前版本的 Icalingua 要求 Bridge 的协议版本为 ${EXCEPTED_PROTOCOL_VERSION}，而服务器的协议版本为 ${version.protocolVersion}`,
          onOk: async () => {
            socket.emit('auth', await sign(salt, getConfig().privateKey));
          },
          onCancel: () => {
            return false;
          }
        });
      }
    });

    // 监听服务端事件
    socket.once('authSucceed', () => {
      attachSocketEvents();
      login = true;
      notification.success({message: '登录成功', description: `身份验证成功，服务器版本${bridgeVersion.version}`});
      useLocation().pathname = '/';
    });

    socket.once('authFailed', async () => {
      notification.error({message: '错误', description: '认证失败'});
      return false;
    });
  },

  isLogin: () => login
};

