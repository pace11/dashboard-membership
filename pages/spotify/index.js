import { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  Card,
  Button,
  Table,
  Space,
  Modal,
  Tag,
  notification,
} from 'antd'
import {
  ReloadOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  SelectOutlined,
  MoreOutlined,
} from '@ant-design/icons'
import { HookSwr } from '@/lib/hooks/HookSwr'
import { createApi } from '@/helpers/utils'
import dayjs from 'dayjs'

const Edit = dynamic(() => import('./drawer/edit'))

const Golongan = ({ isMobile }) => {
  const { data, isLoading, reloadData } = HookSwr({
    path: '/spotify-notif',
  })
  const [isOpenEdit, setOpenEdit] = useState(false)

  const deactivateConfirm = (params) => {
    Modal.confirm({
      title: 'Deactivate',
      content: (
        <p>
          Are your sure for deactivate `<b>{params.title}</b>` ?
        </p>
      ),
      icon: <ExclamationCircleOutlined />,
      okText: 'Yes, do it',
      cancelText: 'No',
      onOk: () => {
        createApi({
          endpoint: `/spotify-notif/deactivate/${params.id}`,
        })
          .then((res) => {
            reloadData('')
            notification.success({
              message: 'Info',
              description: res?.data?.message,
              duration: 1,
            })
          })
          .catch((err) => {
            if ([400].includes(err?.response?.status)) {
              notification.warning({
                message: err?.response?.data?.message,
                description: JSON.stringify(
                  err?.response?.data?.data,
                ),
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
      },
      onCancel: () => {},
    })
  }

  const columns = [
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) =>
        status === 'active' ? (
          <Tag color="green" icon={<CheckCircleOutlined />}>
            Active
          </Tag>
        ) : (
          <Tag color="magenta" icon={<CloseCircleOutlined />}>
            Inactive
          </Tag>
        ),
    },
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      render: (description) => description || '-',
    },
    {
      title: 'Expires At',
      key: 'expires_at',
      dataIndex: 'expires_at',
      render: (expires_at) =>
        expires_at
          ? dayjs(expires_at).format('dddd, DD MMMM YYYY')
          : '-',
    },
    {
      title: 'Member Count',
      key: 'member_count',
      dataIndex: 'member_count',
      render: (member_count) =>
        member_count
          ? `${member_count} User${member_count > 1 ? 's' : ''}`
          : '-',
    },
    {
      title: 'Plan',
      key: 'plan',
      dataIndex: 'plan',
      render: (plan) =>
        plan ? `${plan} Month${plan > 1 ? 's' : ''}` : '-',
    },
    {
      title: 'Updated At',
      key: 'updated_at',
      dataIndex: 'updated_at',
      render: (updated_at) =>
        updated_at
          ? dayjs(updated_at).format('dddd, DD MMMM YYYY')
          : '-',
    },
    {
      title: 'Action',
      ...(!isMobile ? { fixed: 'right'} : null),
      render: (item) => (
        <Space direction="vertical">
          {item?.status === 'active' && (
            <Button
              type="primary"
              icon={<CloseCircleOutlined />}
              onClick={() => deactivateConfirm(item)}
              danger
            >
              Deactivate
            </Button>
          )}
          <Button
            type="dashed"
            icon={<EditOutlined />}
            onClick={() => setOpenEdit(item?.id)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ]

  const extraMobilePopup = () => {
    Modal.info({
      title: 'Aksi',
      content: (
        <Space key="mobile-action-golongan" direction="vertical">
          <Button
            icon={<ReloadOutlined />}
            onClick={() => reloadData('')}
            block
          >
            Refresh data
          </Button>
        </Space>
      ),
      icon: <SelectOutlined />,
    })
  }

  const extraDesktop = [
    <Space key="desktop-action-spotify">
      <Button
        icon={<ReloadOutlined />}
        onClick={() => reloadData('')}
      >
        Refresh data
      </Button>
    </Space>,
  ]

  const extraMobile = [
    <Space key="mobile-action-spotify">
      <Button
        onClick={() => extraMobilePopup()}
        icon={<MoreOutlined />}
        size="middle"
      />
    </Space>,
  ]

  return (
    <Card
      title="Spotify Notif"
      bordered={false}
      extra={isMobile ? extraMobile : extraDesktop}
    >
      <Table
        rowKey="key"
        dataSource={data?.data}
        columns={columns}
        loading={isLoading}
        style={{ width: '100%' }}
        scroll={{ x: 1300 }}
      />
      {isOpenEdit && (
        <Edit
          isMobile={isMobile}
          isOpen={isOpenEdit}
          onClose={() => {
            setOpenEdit(false)
            Modal.destroyAll()
            reloadData('')
          }}
        />
      )}
    </Card>
  )
}

export default Golongan
