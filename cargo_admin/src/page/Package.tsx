import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, notification, Popconfirm, Table, Tag } from 'antd'
import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { EditModalType, ListState } from '../utils/commonTypes'
import { errorHandler } from '../component/Utilities'
import axios from 'axios'
import config, { requestHeader } from '../config'
import OrganizationContext from '../context/OrganizationProvider'
import WarehouseFormModal from '../component/WarehouseFormModal'

const Package = () => {
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
        `${config.get('API_BASE_URL')}/package`,
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


  const removeItem = useCallback(async (id: any) => {
    try {
      await axios.delete(`${config.get('API_BASE_URL')}/warehouse/${id}`, requestHeader)
      notification.success({ message: 'Салбар', description: 'Амжилттай устгалаа', placement: 'topRight' })
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
      title: 'Хэмжээ',
      key: 'type',
      render: (dimession: any) => {
        return (
          <div className='flex flex-col gap-2 '>
            <div className='flex items-center gap-2'>
              <div className='flex gap-2'>
                <p>Өндөр:</p>
                {dimession?.height}
              </div>
              <div className='flex gap-2'>
                <p>Өргөн:</p>
                {dimession?.width}
              </div>
            </div>
            <div className='flex items-center gap-2'>

              <div className='flex gap-2'>
                <p>Жин:</p>
                {dimession?.weight}
              </div>
              <div className='flex gap-2'>
                <p>Урт:</p>
                {dimession?.length}
              </div>
            </div>
          </div>
        )
      }
    },
    {
      title: 'Утас',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Үнэ',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Баркод',
      dataIndex: 'trackCode',
      key: 'trackCode',
    },
    {
      title: 'Тэмдэглэл',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Төлөв',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Эвдэрсэн',
      dataIndex: 'broken',
      key: 'broken',
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

export default Package