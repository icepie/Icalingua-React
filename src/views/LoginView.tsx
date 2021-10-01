import { Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { getConfig, initLocalStorage } from '../providers/configProvider';

export function LoginView() {
  initLocalStorage();
  return (
    <div>
      <Form layout={'vertical'}>
        <Form.Item label={'服务器地址'}>
          <Input>{getConfig().server}</Input>
        </Form.Item>
        <Form.Item label={'私钥'}>
          <Input>{getConfig().privateKey}</Input>
        </Form.Item>
      </Form>
    </div>
  );
}