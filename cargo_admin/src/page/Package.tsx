import {
  BarcodeOutlined,
  DeleteOutlined,
  EditOutlined,
  PhoneOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  Card,
  Input,
  notification,
  Popconfirm,
  Select,
  Table,
  TablePaginationConfig,
  Tag,
} from 'antd'
import type { TableProps } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { EditModalType, Filter, ListState, PackageFieldType } from '../utils/commonTypes'
import { errorHandler } from '../component/Utilities'
import axios from 'axios'
import config, { requestHeader } from '../config'
import { Link, useParams } from 'react-router'
import { CommonState, ItemStatus } from '../utils/enum'
import queryString from 'query-string'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import PackageUpdateModal from '../component/PackageUpdateModal'
import PackageFormModal from '../component/PackageFormModal'

const filterOptions = [
  {
    value: '',
    label: 'Бүгд',
  },
  {
    value: ItemStatus.REGISTERED,
    label: 'Бүртгэж авсан',
  },
  {
    value: ItemStatus.RECEIVED,
    label: 'Хүлээн авсан',
  },
  {
    value: ItemStatus.BROKEN,
    label: 'Эвдэрсэн',
  },
  {
    value: ItemStatus.FINISHED,
    label: 'Хаагдсан',
  },
]
const status = [
  { value: ItemStatus.RECEIVED, label: 'Хүлээн авсан' },
  { value: ItemStatus.BROKEN, label: 'Эвдэрсэн' },
  { value: ItemStatus.FINISHED, label: 'Захиалга дуусгах' },
]

const Package = () => {
  const { warehouseId } = useParams()
  const [edit, updateEdit] = useState<EditModalType>({ visible: false })
  const [create, setCreate] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [state, updateState] = useState<ListState>({
    loading: true,
    list: [],
  })

  const [filter, updateFilter] = useState<Filter>({
    page: 1,
    size: 10,
  })
  console.log("🚀 ~ Package ~ filter:", filter)

  const fetchList = useCallback(async () => {
    updateState((prev) => ({ ...prev, loading: true }))

    try {
      const query = {
        ...filter,
        state: CommonState.ACTIVE,
      }

      // status хоосон бол query-д оруулахгүй
      if (!filter.status) {
        delete query.status
      }

      const { data } = await axios.get(
        `${config.get('API_BASE_URL')}/package/list/${warehouseId}?${queryString.stringify(query)}`,
        requestHeader,
      )

      updateState({
        loading: false,
        list: data.list || [],
        total: data.total || 0,
      })
    } catch (err) {
      updateState((prev) => ({ ...prev, loading: false }))
      errorHandler(err)
    }
  }, [filter])

  useEffect(() => {
    fetchList()
  }, [filter])

  const removeItem = useCallback(async (id: any) => {
    try {
      await axios.delete(`${config.get('API_BASE_URL')}/warehouse/${id}`, requestHeader)
      notification.success({ message: 'Салбар', description: 'Амжилттай устгалаа', placement: 'topRight' })
      fetchList()
    } catch (error: any) {
      notification.error({ message: error.message })
    }
  }, [])
  const updateMultipleStatus = useCallback(async (ids: any, status: ItemStatus) => {
    const payload = {
      ids: ids,
      status,
    }
    try {
      await axios.put(`${config.get('API_BASE_URL')}/package/multiple-update-status`, payload, requestHeader)
      notification.success({ message: 'Төлөв', description: 'Амжилттай солигдлоо', placement: 'topRight' })
      fetchList()
      setSelectedRowKeys([])
    } catch (error: any) {
      notification.error({ message: error.message })
    }
  }, [])

  const rowSelection: TableProps<PackageFieldType>['rowSelection'] = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[], selectedRows: PackageFieldType[]) => {
      const uniqueStatuses = Array.from(new Set(selectedRows.map((row) => row.status)))

      if (uniqueStatuses.length > 1) {
        notification.warning({
          message: 'Анхааруулга',
          description: 'Зөвхөн ижил төлөвтэй бараануудыг сонгох боломжтой!',
        })
        return // сонголтыг хүлээж авахгүй
      }

      setSelectedRowKeys(selectedKeys)
    },
  }

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
          <div className="flex flex-col gap-2 ">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <p>Өндөр:</p>
                {dimession?.height}cm
              </div>
              <div className="flex gap-2">
                <p>Өргөн:</p>
                {dimession?.width}cm
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <p>Жин:</p>
                {dimession?.weight}kg
              </div>
              <div className="flex gap-2">
                <p>Урт:</p>
                {dimession?.length}cm
              </div>
            </div>
          </div>
        )
      },
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
      title: 'Төлөв',
      dataIndex: 'status',
      key: 'status',
      render: (status: any) => {
        const renderColor = (status: string) => {
          if (status === ItemStatus.REGISTERED) {
            return { color: 'lime', text: 'Бүртгэж авсан' }
          } else if (status === ItemStatus.RECEIVED) {
            return { color: 'blue', text: 'Хүлээн авсан' }
          } else if (status === ItemStatus.FINISHED) {
            return { color: 'magenta', text: 'Хаагдсан' }
          } else if (status === ItemStatus.BROKEN) {
            return { color: 'red', text: 'Эвдэрсэн' }
          }
        }
        const { color, text } = renderColor(status) || { color: 'lime', text: status }
        return <Tag color={color}>{text}</Tag>
      },
    },
    {
      title: 'Эвдэрсэн',
      dataIndex: 'broken',
      key: 'broken',

      render: (broken: boolean) => {
        return <Tag color={broken ? 'red' : 'green'}>{broken ? 'Тийм' : 'Үгүй'}</Tag>
      },
    },
    {
      title: 'Тэмдэглэл',
      dataIndex: 'notes',
      key: 'notes',
      render: (notes: string) => {
        return <span className="text-xs">{notes ? notes : 'Тэмдэглэл байхгүй'}</span>
      },
    },
    {
      title: 'Үйлдэл',
      width: 150,
      render: (record: any) => {
        return (
          <div className="flex flex-col gap-3">
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
    <div className="p-4 space-y-4">
      <Breadcrumb
        separator=">"
        items={[
          {
            title: <Link to="/">Нүүр</Link>,
          },
          {
            title: <Link to="/selectWarehouse">Агуулгын жагсаалт</Link>,
          },
          {
            title: 'Барааны жагсаалт',
          },
        ]}
      />
      <div className="flex items-center gap-3">
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Search to Select"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          onChange={(value) => {
            updateFilter((prev) => ({ ...prev, status: value }))
          }}
          defaultValue={''}
          options={filterOptions}
        />
        <Input
          className="w-fit"
          size="middle"
          placeholder="Утсаар хайх"
          onChange={(e: any) => {
            updateFilter((prev) => ({ ...prev, phone: e.target.value }))
          }}
          prefix={
            <div style={{ transform: 'rotate(90deg)' }}>
              <PhoneOutlined />
            </div>
          }
        />
        <Input
          onChange={(e: any) => {
            updateFilter((prev) => ({ ...prev, trackCode: e.target.value }))
          }}
          className="w-fit"
          size="middle"
          placeholder="Баркод"
          prefix={<BarcodeOutlined />}
        />

        <Popover>
          {({ close }) => {
            return (
              <>
                <PopoverButton
                  disabled={!selectedRowKeys.length}
                  className={clsx(
                    'relative block w-fit rounded-lg bg-white py-[4px] pr-8 pl-3 text-left text-sm/6 text-black border disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed',
                    'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
                  )}
                >
                  <span className="block truncate">Төлөв солих</span>
                  <ChevronDownIcon
                    className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
                    aria-hidden="true"
                  />
                </PopoverButton>
                <PopoverPanel
                  transition
                  anchor="bottom"
                  className="main-shadow space-y-1 rounded-xl bg-white text-sm/6 p-4 mt-4 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                >
                  {status.map((status) => {
                    return (
                      <div
                        key={status.value}
                        onClick={() => {
                          updateMultipleStatus(selectedRowKeys, status.value), close()
                        }}
                        className={`rounded-md group flex cursor-pointer items-center gap-2 px-3 py-1.5 hover:bg-gray-100 transition-all duration-200 ease-in`}
                      >
                        <div className="text-sm/6 text-black">{status.label}</div>
                      </div>
                    )
                  })}
                </PopoverPanel>
              </>
            )
          }}
        </Popover>
      </div>
      <Card
        className="full-card"
        title={`Барааны жагсаалт ${state?.total ?? 0}`}
        loading={false}
        extra={
          <Button type="primary" onClick={() => setCreate(true)} icon={<PlusOutlined />}>
            Бараа нэмэх
          </Button>
        }
      >
        <Table
          size="small"
          loading={state.loading}
          dataSource={state.list || []}
          rowKey={'id'}
          pagination={{ current: filter?.page || 1, size: 'small', pageSize: filter.size, total: state.total }}
          columns={columns}
          rowSelection={{ ...rowSelection }}
          onChange={(pagination: TablePaginationConfig) =>
            updateFilter({
              ...filter,
              page: pagination.current || 1,
              size: pagination.pageSize || 10,
            })
          }
        />
      </Card>

      {create && <PackageFormModal open={create} onClose={() => setCreate(false)} refetch={() => fetchList()} />}
      {edit?.visible && (
        <PackageUpdateModal
          open={edit.visible}
          id={edit?.id}
          onClose={() => updateEdit({ visible: false })}
          refetch={() => fetchList()}
        />
      )}
    </div>
  )
}

export default Package
