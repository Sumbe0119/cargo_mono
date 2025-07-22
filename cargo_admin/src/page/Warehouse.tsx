import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Popconfirm, Table } from 'antd'
import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { EditModalType, ListState } from '../utils/commonTypes'
import { errorHandler } from '../component/Utilities'
import axios from 'axios'
import config, { requestHeader } from '../config'
import OrganizationContext from '../context/OrganizationProvider'
import WarehouseFormModal from '../component/WarehouseFormModal'

const Warehouse = () => {
  const { org } = useContext(OrganizationContext)

  const [edit, updateEdit] = useState<EditModalType>({ visible: false })
  const [state, updateState] = useState<ListState>({
    loading: true,
    list: [],
  })


  const fetchList = useCallback(async () => {

    updateState((prev) => ({ ...prev, loading: true }))

    try {
      const { data } = await axios.get(
        `${config.get('API_BASE_URL')}/warehouse?orgId=${org?.id}&state=ACTIVE&page=1&size=10`,
        requestHeader,
      )

      updateState({
        loading: false,
        list: data.list || [],
      })
    } catch (err) {
      updateState((prev) => ({ ...prev, loading: false }))
      errorHandler(err)
    }
  }, [])

  useEffect(() => {
    fetchList()
  }, [])


  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Нэр',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Дэлгэрэнгүй хаяг',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Бүс нутаг',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Холбоо барих',
      dataIndex: 'contactInfo',
      key: 'contactInfo',
      render: (record: any) => {
        return (
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <p>Утас:</p>
              {record?.phone}
            </div>
            <div className='flex gap-2'>
              <p>Имэйл:</p>
              {record?.email}
            </div>

          </div>
        )
      }
    },
    {
      title: 'Ажлын цаг',
      dataIndex: 'operatingHours',
      key: 'operatingHours',
      render: (record: any) => {
        return (
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <p>Ажлын өдөр:</p>
              {record?.weekdays}
            </div>
            <div className='flex gap-2'>
              <p>Амралтын өдөр:</p>
              {record?.weekends}
            </div>

          </div>
        )
      }
    },
    {
      title: 'Юань Ханш',
      dataIndex: 'currency',
      key: 'currency',
      render: (record: any) => {
        return (
          <div className='flex flex-col gap-2 items-start'>
            <div className='flex items-center gap-2'>
              <div className='flex gap-2'>
                <p>Кг:</p>
                {record?.kg}MNT
              </div>
              <div className='flex gap-2'>
                <p>м3:</p>
                {record?.m3}CYN
              </div>
            </div>
            <div className='flex items-center justify-center gap-2'>
              Үнэлгээ : {record?.rate}MNT
            </div>
          </div>
        )
      }
    },
    {
      title: 'Үйлдэл',
      width: 150,
      render: (record: any) => {
        return (
          <div className='flex flex-col gap-3'>
            <Button onClick={() => updateEdit({ visible: true, id: record?.id })} size="small" icon={<EditOutlined />}>
              Засах
            </Button>
            <Popconfirm
              onConfirm={() => console.info(`remuve ${record}`)}
              placement="top"
              title={'Устгах'}
              description={'Номыг устгахдаа итгэлтэй байна уу'}
              okText="Yes"
              cancelText="No"
            >
              <Button size="small" danger type="primary" icon={<DeleteOutlined />}>
                Устгах
              </Button>
            </Popconfirm>
          </div>
        )
      },
    },
  ]

  return (
    <Fragment>
      <Card
        className="full-card"
        title="Агуулхын жагсаалт"
        loading={false}
        extra={
          <Button type="primary" onClick={() => updateEdit({ visible: true })} icon={<PlusOutlined />}>
            Агуулах нэмэх
          </Button>
        }
      >
        <Table
          size="small"
          loading={state.loading}
          dataSource={state.list || []}
          rowKey={'id'}
          pagination={false}
          columns={columns}
        />
      </Card>

      {edit?.visible && (
        <WarehouseFormModal
          title="Салбар нэмэх"
          open={edit.visible}
          id={edit?.id}
          onClose={() => updateEdit({ visible: false })}
          refetch={() => fetchList()}
        />
      )}
    </Fragment>
  )
}

export default Warehouse