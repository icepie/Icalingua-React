import { Button, Col, Form, Input, Row } from 'antd';
import React from 'react';
import { getConfig } from '../providers/configProvider';

export function LoginView() {
  const [form] = Form.useForm();
  form.setFieldsValue(getConfig());

  function login() {
    console.log(form.getFieldsValue())
  }

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