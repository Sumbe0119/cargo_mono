import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Flex, notification, Popconfirm, Table } from 'antd'
import { Fragment, useCallback, useEffect, useState } from 'react'
import CargoAddressFormModal from '../component/CargoAddressFormModal'
import { EditModalType, ListState } from '../utils/commonTypes'
import axios from 'axios'
import config, { requestHeader } from '../config'
import { errorHandler } from '../component/Utilities'

const CargoAddress = () => {
  const warehouseId = 1

  const [edit, updateEdit] = useState<EditModalType>({ visible: false })
  const [state, updateState] = useState<ListState>({
    loading: true,
    list: [],
  })

  const fetchList = useCallback(async () => {

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

  const removeItem = useCallback(async (id: any) => {
    try {
      await axios.delete(`${config.get('API_BASE_URL')}/cargoAddress/${id}`, requestHeader)
      notification.success({ message: 'Хаяг', description: 'Амжилттай устгалаа', placement: 'topRight' })
      fetchList()
    } catch (error: any) {
      notification.error({ message: error.message })
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

            <Popconfirm
              onConfirm={() => removeItem(record?.id)}
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
          </Flex>
        )
      },
    },
  ]

  return (
    <Fragment>
      <Card
        className="full-card"
        title="Хаяг жагсаалт"
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
