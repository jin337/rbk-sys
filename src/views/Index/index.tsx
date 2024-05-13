import { } from 'react'
import styles from './index.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
const { Header, Content, Sider } = Layout;

const Menuitems: Required<MenuProps>['items'] = [
  {
    key: '/member',
    label: '会员'
  },
  {
    key: '/order',
    label: '订单'
  },
  {
    key: '/category',
    label: '类别',
  },
  {
    key: '/goods',
    label: '商品'
  },
  {
    key: '/swiper',
    label: '轮播图',
  },
]

const items: MenuProps['items'] = [
  {
    key: '2',
    label: '退出',
  }
];

const Index = () => {
  const navigate = useNavigate()
  // 菜单点击事件
  const handleClick = (e: { key: string }) => {
    if (e.key.includes('/')) {
      navigate(e.key)
    } else {
      navigate('/')
    }
  }


  return (
    <Layout style={{ height: '100vh' }}>
      <Header>
        <div className={styles['header-wrap']}>
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </Dropdown>
        </div>

      </Header>
      <Layout>
        <Sider theme="light" className={styles['sider-content']}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            items={Menuitems}
            style={{ borderRight: 0 }}
            onClick={handleClick}
          />
        </Sider>
        <Layout>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}
export default Index
