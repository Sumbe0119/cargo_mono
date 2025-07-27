import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'
import { Layout, Card, Row, Col, Table, Flex, Button, Popconfirm, Skeleton } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import ChartComponent from '../component/ChartComponent'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import config, { requestHeader } from '../config'
import axios from 'axios'
import OrganizationContext from '../context/OrganizationProvider'
import { errorHandler } from '../component/Utilities'
import { getFormatMoney } from '../utils/common'
import TotalItemCountChartComponent from '../component/TotalItemCountChartComponent'
import DelivredCountChartComponent from '../component/DelivredCountChartComponent'
import BrokenChart from '../component/BrokenChart'

const { Content } = Layout

dayjs.locale('mn')
dayjs.extend(dayLocaleData)
interface MonthlySale {
  month: string
  totalPrice: number
}

interface WarehouseSales {
  warehouseId: number
  warehouseName: string
  monthlySales: MonthlySale[]
}

const Home = () => {
  const { org } = useContext(OrganizationContext)
  const [row, setRow] = useState<WarehouseSales[]>()
  const [totalRow, setTotalRow] = useState<any[]>()

  const [loading, setLoading] = useState(false)
  const [totalLoading, setTotalLoading] = useState(false)

  const fetchList = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await axios.get(`${config.get('API_BASE_URL')}/dashboard/${org?.id}/summary`, requestHeader)
      setLoading(false)
      setRow(data)
    } catch (err) {
      setLoading(false)
      errorHandler(err)
    }
  }, [org?.id])

  const fetchListCount = useCallback(async () => {
    setTotalLoading(true)

    try {
      const { data } = await axios.get(
        `${config.get('API_BASE_URL')}/dashboard/${org?.id}/packages/monthly-count`,
        requestHeader,
      )
      setTotalLoading(false)
      setTotalRow(data)
    } catch (err) {
      setTotalLoading(false)
      errorHandler(err)
    }
  }, [org?.id])

  useEffect(() => {
    fetchList()
    fetchListCount()
  }, [])
  const currentMonth = dayjs().format('YYYY-MM')

  const currentMonthSalesPrice = useMemo(() => {
    return (
      row?.reduce((acc: number, warehouse: any) => {
        const monthlySale = warehouse.monthlySales.find((sale: MonthlySale) => sale.month === currentMonth)
        return monthlySale ? acc + monthlySale.totalPrice : acc
      }, 0) ?? 0
    )
  }, [row])

  const currentMonthTotalPackage = useMemo(() => {
    return (
      totalRow?.reduce((acc: number, warehouse: any) => {
        const currentMoth = warehouse.monthlyCounts.find((value: any) => value.month === currentMonth)
        return currentMoth ? acc + currentMoth.totalCount : acc
      }, 0) ?? 0
    )
  }, [totalRow])
  const currentMonthBrokenPackage = useMemo(() => {
    return (
      totalRow?.reduce((acc: number, warehouse: any) => {
        const currentMoth = warehouse.monthlyCounts.find((value: any) => value.month === currentMonth)
        return currentMoth ? acc + currentMoth.brokenCount : acc
      }, 0) ?? 0
    )
  }, [totalRow])

  const currentMonthSentPackage = useMemo(() => {
    return (
      totalRow?.reduce((acc: number, warehouse: any) => {
        const currentMoth = warehouse.monthlyCounts.find((value: any) => value.month === currentMonth)
        return currentMoth ? acc + currentMoth.sentCount : acc
      }, 0) ?? 0
    )
  }, [totalRow])

  const data = [
    {
      key: '1',
      name: 'Бат',
      role: 'Менежер',
      phone: '99001122',
    },
    {
      key: '2',
      name: 'Сараа',
      role: 'Захирал',
      phone: '88002233',
    },
  ]

  const columns = [
    {
      title: 'Нэр',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Эрх',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Утас',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Үйлдэл',
      width: 150,
      render: () => {
        return (
          <Flex gap={14}>
            <Button onClick={() => console.info('click')} size="small" icon={<EditOutlined />}>
              Засах
            </Button>
            <Popconfirm
              onConfirm={() => console.info('delete')}
              placement="top"
              title="Хасах"
              description="Ажилтан хасах гэж байна. Итгэлтэй байна уу"
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" danger type="primary" icon={<DeleteOutlined />}>
                Устгах
              </Button>
            </Popconfirm>
          </Flex>
        )
      },
    },
  ]

  return (
    <div className="p-4 space-y-4">
      <Content className="space-y-4">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-xl font-semibold text-black">Хянах самбар</h1>
          <div className="flex justify-end mb-4">
            <Button type="primary" onClick={() => console.info('first')} icon={<PlusOutlined />}>
              Хаяг нэмэх
            </Button>
          </div>
        </div>
        <Row gutter={18} className="">
          <Col span={12} xs={24} lg={12}>
            {loading ? <Skeleton /> : <ChartComponent row={row} />}
          </Col>
          <Col span={12} xs={24} lg={12}>
            {totalLoading ? <Skeleton /> : <TotalItemCountChartComponent row={totalRow} />}
          </Col>
          {/* <Col span={12} xs={24} lg={12}>
            {totalLoading ? <Skeleton /> : <DelivredCountChartComponent row={totalRow} />}
          </Col>
          <Col span={12} xs={24} lg={12}>
            {totalLoading ? <Skeleton /> : <BrokenChart row={totalRow} />}
          </Col> */}
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Card title="Энэ сарын борлуулалт" bordered={false}>
              {getFormatMoney(currentMonthSalesPrice)}
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Бүртгэсэн бараа" bordered={false}>
              {currentMonthTotalPackage} ширхэг
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Эвдэрсэн бараа" bordered={false}>
              {currentMonthBrokenPackage} ширхэг
            </Card>
          </Col>
          <Col span={6}>
            <Card title="Хүргэлтээр гарсан" bordered={false}>
              {currentMonthSentPackage} ширхэг
            </Card>
          </Col>
        </Row>

        <Card style={{ marginTop: 24 }} title="Ажилчдын жагсаалт">
          <Table dataSource={data} columns={columns} />
        </Card>
      </Content>
    </div>
  )
}

export default Home
