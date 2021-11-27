import { Button, Col, Form, Input, Row } from 'antd'
import { getConfig, saveConfig } from 'providers/configProvider'
import React, { useEffect } from 'react'

export default function Login() {
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(getConfig())
  }, [])

  const login = async () => {
    saveConfig(form.getFieldsValue())
    location.href = '/'
  }

  return (
    <div>
      <Row className="box" justify="center">
        <Col span={8}>
          <Form layout="vertical" form={form}>
            <Form.Item label="服务器地址" name="server">
              <Input />
            </Form.Item>
            <Form.Item label="私钥" name="privateKey">
              <Input />
            </Form.Item>

            <Button htmlType="submit" onClick={login}>
              登录
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
