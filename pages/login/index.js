/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { Button, Form, Input, Row, Card, notification } from 'antd'
import Link from 'next/link'
import { MailTwoTone, LockTwoTone } from '@ant-design/icons'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { authApi } from '@/helpers/utils'
import { useRouter } from 'next/router'

const cookie = require('cookie')

const Login = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onFinish = (values) => {
    setIsLoading(true)
    const expires = new Date()
    expires.setSeconds(expires.getSeconds() + 86400)
    authApi({
      endpoint: '/login',
      payload: values,
    })
      .then((res) => {
        if (res?.status === 200) {
          setIsLoading(false)
          Cookies.set('tknMembership', res?.data?.data?.token, {
            expires,
            path: '/',
          })
          notification.success({
            message: 'Info',
            description: res?.data?.message,
            duration: 1,
          })
          router.push({ pathname: '/' })
        }
      })
      .catch((err) => {
        if ([401].includes(err?.response?.status)) {
          setIsLoading(false)
          notification.error({
            message: 'Error',
            description: 'Login gagal',
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
            margin: 0,
            padding: 0,
            fontWeight: 'bold',
          }}
        >
          LOGIN
        </h2>
        <p
          style={{
            textAlign: 'center',
            margin: '0 0 25px 0',
            padding: 0,
          }}
        >
          Dashboard Membership
        </p>
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

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Harap isikan password!',
              },
            ]}
          >
            <Input.Password
              prefix={<LockTwoTone twoToneColor="#1890FF" />}
              placeholder="Password ..."
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Link href="/forgot-password">Lupa password?</Link>
          </Form.Item>

          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              block
            >
              Login
            </Button>
          </Form.Item>

        </Form>
      </Card>
    </Row>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context

  let cookies
  let authorization = null

  if (req.headers.cookie) {
    cookies = cookie.parse(req.headers.cookie)
    authorization = cookies.tknMembership
  }

  if (authorization) {
    res.writeHead(302, {
      Location: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    })
    res.end()
  }

  return {
    props: {},
  }
}

export default Login
