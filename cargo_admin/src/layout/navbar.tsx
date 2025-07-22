import { useState } from 'react'
import { Layout, Menu } from 'antd'
import PagePath from '../component/pagePath'


import {
  ApartmentOutlined,
  BoxPlotOutlined,
  HomeOutlined,
  MenuOutlined,
  ProjectOutlined,
} from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router';

const { Content, Footer, Sider } = Layout
const menus = [
  {
    key: 'Home',
    url: PagePath.home,
    label: 'Эхлэх',
    icon: <HomeOutlined />,
  },
  {
    key: 'warehouse',
    url: PagePath.warehouse,
    label: 'Салбар',
    icon: <ApartmentOutlined />,
  },
  {
    key: 'cargoAddress',
    url: PagePath.cargoAddress,
    label: 'Агуулхын хаяг',
    icon: <ProjectOutlined />
  },
  {
    key: 'package',
    url: PagePath.package,
    label: 'Ачаа бүртгэл',
    icon: <BoxPlotOutlined />,
  },
  {
    key: 'organization',
    url: PagePath.organization,
    label: 'organization',
    icon: <MenuOutlined />,
  }
]

const LeftMenu = () => {
  const [collapsed, setOrderDetail] = useState(false)
  const navigate = useNavigate();

  const pathChanger = (path: any) => {
    const result = menus.find(({ key }) => key === path.key)
    const url = result ? result.url : ''
    navigate(url.toString());
  }

  const onCollapses = () => {
    console.warn(collapsed)
    setOrderDetail(!collapsed)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className="block" collapsible collapsed={collapsed} onCollapse={onCollapses} theme="dark">
        <Menu theme="dark" defaultSelectedKeys={['1']} onClick={pathChanger} mode="inline" items={menus} />
      </Sider>
      <Layout className="site-layout" style={{ overflow: 'auto', height: '100vh' }}>
        <Content style={{ margin: '0 10px' }}>
          <div className="site-layout" style={{ padding: 5, minHeight: 360 }}>
            <Outlet />
          </div>
          <Footer style={{ textAlign: 'center' }}>footer ©{new Date().getFullYear()} Footer</Footer>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LeftMenu
