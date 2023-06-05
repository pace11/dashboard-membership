import { useRef, useState, useEffect } from 'react'
import {
  Drawer,
  Space,
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  DatePicker,
  Switch,
} from 'antd'
import dayjs from 'dayjs'
import { SaveOutlined, CloseOutlined } from '@ant-design/icons'
import { updateApi } from '@/helpers/utils'
import { HookSwr } from '@/lib/hooks/HookSwr'

export default function Edit({ isMobile, onClose, isOpen }) {
  const { data: detail } = HookSwr({
    path: isOpen ? `/spotify-notif/${isOpen}` : '',
  })
  const refButton = useRef(null)
  const [form] = Form.useForm()
  const [isLoading, setLoading] = useState(false)

  const onSubmitClick = () => {
    // `current` points to the mounted text input element
    refButton.current.click()
  }

  const onFinish = (values) => {
    const payload = {
      title: values?.title || null,
      description: values?.description || null,
      plan: values?.plan || null,
      member_count: values?.plan || null,
      expires_at: values?.expires_at
        ? dayjs(new Date(values?.expires_at)).format('YYYY-MM-DD')
        : null,
      status: values?.status ? 'active' : 'inactive',
    }

    updateApi({
      endpoint: `/spotify-notif/update/${isOpen}`,
      payload,
    })
      .then((res) => {
        form.resetFields()
        setLoading(false)
        notification.success({
          message: 'Info',
          description: res?.data?.message,
          duration: 1,
        })
        onClose()
      })
      .catch((err) => {
        setLoading(false)
        if ([400].includes(err?.response?.status)) {
          notification.warning({
            message: err?.response?.data?.message,
            description: JSON.stringify(err?.response?.data?.data),
            duration: 1,
          })
        }
        if ([500].includes(err?.response?.status)) {
          notification.error({
            message: 'Error',
            description: err?.response?.statusText,
            duration: 1,
          })
        }
      })
  }

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        title: detail?.data?.title,
        description: detail?.data?.description,
        plan: detail?.data?.plan,
        member_count: detail?.data?.member_count,
        expires_at: detail?.data?.expires_at
          ? dayjs(detail?.data?.expires_at)
          : null,
        status: detail?.data?.status === 'active' ? true : false,
      })
    }
  }, [isOpen, form, detail])

  return (
    <Drawer
      title={isMobile ? false : 'Edit data'}
      width={isMobile ? '100%' : 480}
      placement={isMobile ? 'bottom' : 'right'}
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button
            onClick={() => {
              onClose()
              form.resetFields()
            }}
            icon={<CloseOutlined />}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            onClick={() => onSubmitClick()}
            icon={<SaveOutlined />}
            type="primary"
            loading={isLoading}
          >
            Simpan
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
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
        autoComplete="off"
        // onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        labelAlign="left"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Harap isikan title!',
            },
          ]}
        >
          <Input size="large" placeholder="Title ..." />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea
            size="large"
            placeholder="Description ..."
          />
        </Form.Item>
        <Form.Item label="Plan" name="plan">
          <InputNumber
            size="large"
            placeholder="Plan ..."
            min={0}
            style={{ width: '50%' }}
          />
        </Form.Item>
        <Form.Item label="Member Count" name="member_count">
          <InputNumber
            size="large"
            placeholder="Member ..."
            min={0}
            style={{ width: '50%' }}
          />
        </Form.Item>
        <Form.Item
          label="Expires At"
          name="expires_at"
          rules={[
            {
              required: true,
              message: 'expires at required!',
            },
          ]}
        >
          <DatePicker
            placeholder="Expires At ..."
            size="large"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item hidden>
          <Button ref={refButton} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
