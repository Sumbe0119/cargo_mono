import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Table } from 'antd'
import { Fragment, useCallback, useEffect, useState } from 'react'
import CargoAddressFormModal from '../component/CargoAddressFormModal'
import { EditModalType, ListState } from '../utils/commonTypes'
import axios from 'axios'
import config from '../config'
import { errorHandler } from '../component/Utilities'

const CargoAddress = () => {
  const warehouseId = 1
  const [edit, updateEdit] = useState<EditModalType>({ visible: false })
  const [state, updateState] = useState<ListState>({
    loading: true,
    list: [],
  })


  const fetchList = useCallback(async () => {
    const requestHeader = { headers: { 'content-type': 'application/json' } }

    updateState((prev) => ({ ...prev, loading: true }))

    try {
      const { data } = await axios.get(
        `${config.get('API_BASE_URL')}/cargoAddress/${warehouseId}/all?page=1&limit=5`,
        requestHeader,
      )

      updateState({
        loading: false,
        list: data.data || [],
      })

    } catch (err) {
      updateState((prev) => ({ ...prev, loading: false }))
      errorHandler(err)
    }
  }, [])

  useEffect(() => {
    if (warehouseId) {
      fetchList()
    }
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Хүлээн авагч',
      dataIndex: 'consignee',
      key: 'consignee',
    },
    {
      title: 'Утас',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Бүс нутаг',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: 'Дэлгэрэнгүй хаяг',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Үйлдэл',
      width: 150,
      render: (record: any) => {
        return (
          <Flex gap={14}>
            <Button onClick={() => updateEdit({ visible: true, id: record.id })} size="small" icon={<EditOutlined />}>
              Засах
            </Button>
            {/* <Button size="small" danger type="primary" onClick={() => console.info('first')} icon={<DeleteOutlined />}>
              Устгах
            </Button> */}
          </Flex>
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
            Хаяг нэмэх
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
        <CargoAddressFormModal
          title="Агуулхын хаяг нэмэх"
          open={edit.visible}
          id={edit?.id}
          onClose={() => updateEdit({ visible: false })}
          refetch={() => fetchList()}
        />
      )}
    </Fragment>
  )
}

export default CargoAddress
