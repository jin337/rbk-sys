import { } from 'react'
import { Table, Button, Card, Form, Input, Col, Row, Popconfirm, Space,Image } from 'antd';
import type { TableProps } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  img?: string;
  start_time?: string;
  update_time?: string;
}

const Popconfirmprops = {
  title: "提示",
  description: "是否确认删除当前数据？",
  onConfirm() {
    console.log('确认删除');
  }
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '图片',
    dataIndex: 'img',
    key: 'img',
    align: "center",
    render: (text) => <Image width={'auto'} height={80} src={text} />
  },
  {
    title: '创建时间',
    align: "center",
    dataIndex: 'start_time',
    key: 'start_time',
  },
  {
    title: '更新时间',
    align: "center",
    dataIndex: 'update_time',
    key: 'update_time',
  },
  {
    title: 'Action',
    key: 'action',
    align: "center",
    render: () => (
      <Space size="middle">
        <Button size="small" autoInsertSpace={false}>编辑</Button>
        <Popconfirm {...Popconfirmprops}>
          <Button size="small" autoInsertSpace={false} danger>删除</Button>
        </Popconfirm>
      </Space>
    ),
  }
]

const data: DataType[] = [
  {
    key: '1',
    img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    start_time: '2024-5-13 16:38:45',
    update_time: '2024-5-13 16:38:45',
  },
  {
    key: '2',
    img: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
    start_time: '2024-5-13 16:38:45',
    update_time: '2024-5-13 16:38:45',
  },
  {
    key: '3',
    img: 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
    start_time: '2024-5-13 16:38:45',
    update_time: '2024-5-13 16:38:45',
  },
];

const Swiper = () => {
  const [form] = Form.useForm();

  return (
    <Card title={
      <Form form={form} name="horizontal_login" layout="vertical" >
        <Row gutter={24}>
          <Col span={7}>
            <Form.Item label="username" name="username">
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="password" name="password">
              <Input type="password" placeholder="Password" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item label="password1" name="password1">
              <Input type="password" placeholder="Password" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    } extra={
      <Space>
        <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
        <Button type="primary" icon={<PlusOutlined />}>新建</Button>
      </Space>
    }>
      <Table bordered size="middle" columns={columns} dataSource={data} />
    </Card>
  )
}
export default Swiper
