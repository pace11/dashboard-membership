import { Row, Col, Card, Statistic } from 'antd'
import {
  UsergroupAddOutlined,
} from '@ant-design/icons'

export default function Home({ isMobile }) {

  return (
    <>
      <Row gutter={[14, 14]} style={{ marginBottom: '15px' }}>
        <Col span={isMobile ? 24 : 6}>
          <Card bordered={false}>
            <Statistic
              title="Membership"
              value={1}
              prefix={<UsergroupAddOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
