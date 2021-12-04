import { Button, Col, Form, Input, Row } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getConfig, saveConfig } from '../providers/configProvider'

export default function Login() {
  const requireLogin = getConfig().server === '' || getConfig().privateKey === ''
  const navigate = useNavigate()
  useEffect(() => {
    if (!requireLogin) navigate('/')
  }, [])

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue(getConfig())
  }, [])

  const login = async () => {
    saveConfig(form.getFieldsValue())
    navigate('/', { replace: true }) // 不在 history 里留记录，因为不应该留
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
