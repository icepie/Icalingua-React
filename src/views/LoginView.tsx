import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { getConfig, saveConfig } from '../providers/configProvider';
import { adapter } from '../adapters/socketIoAdapter';

export function LoginView() {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(getConfig());
  }, []);

  const login = async () => {
    saveConfig(form.getFieldsValue());
    await adapter.createBot();

    // TODO: 无法使用
    useHistory().push('/');
  };

  return (
    <div>
      <Row className={'box'} justify={'center'}>
        <Col span={8}>
          <Form layout={'vertical'} form={form}>
            <Form.Item label={'服务器地址'} name={'server'}>
              <Input />
            </Form.Item>
            <Form.Item label={'私钥'} name={'privateKey'}>
              <Input />
            </Form.Item>

            <Button htmlType={'submit'} onClick={login}>登录</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}