/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { Button, Form, Input, Row, Card, notification } from 'antd'
import Link from 'next/link'
import { MailTwoTone } from '@ant-design/icons'
import React, { useState } from 'react'
import { authApi } from '@/helpers/utils'
import { useRouter } from 'next/router'

const ForgotPassword = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    setIsLoading(true)
    authApi({
      endpoint: '/forgot-password',
      payload: values,
    })
      .then((res) => {
        setIsLoading(false)
        notification.success({
          message: 'Info',
          description: res?.data?.message,
          duration: 1,
        })
        router.push({
          pathname: '/change-password',
          query: { token: res?.data?.data?.token },
        })
      })
      .catch((err) => {
        if ([404].includes(err?.response?.status)) {
          setIsLoading(false)
          notification.warning({
            message: 'Info',
            description: err?.response?.data?.message,
            duration: 1,
          })
        }
        if ([500].includes(err?.response?.status)) {
          setIsLoading(false)
          notification.error({
            message: 'Error',
            description: err?.response?.statusText,
            duration: 1,
          })
        }
      })
  }

  // const onFinishFailed = (errorInfo) => {

  // 	console.log("Failed:", errorInfo);

  // };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
        background: '#f5f5f5',
        flexDirection: 'column',
      }}
    >
      <Card bordered={false} style={{ width: '350px' }}>
        <h2
          style={{
            textAlign: 'center',
            margin: '0 0 25px 0',
            padding: 0,
            fontWeight: 'bold',
          }}
        >
          LUPA PASSWORD
        </h2>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          labelAlign="left"
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'Harap isikan format email valid!',
              },
            ]}
          >
            <Input
              prefix={<MailTwoTone twoToneColor="#1890FF" />}
              placeholder="Email ..."
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              block
            >
              Submit
            </Button>
          </Form.Item>

          <Form.Item>
            <p style={{ textAlign: 'center' }}>
              Sudah punya akun ?{' '}
              <Link className="register" href="/login">
                Login disini
              </Link>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}

export default ForgotPassword
