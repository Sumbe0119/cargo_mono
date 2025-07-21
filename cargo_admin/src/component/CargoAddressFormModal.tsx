import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'
import { Form, Input, Modal, notification, Select, Skeleton } from 'antd'
import axios from 'axios'
import config from '../config'
import { errorHandler } from './Utilities'
import { useCallback, useEffect, useState } from 'react'

dayjs.locale('mn')
dayjs.extend(dayLocaleData)

type FieldType = {
  warehouseId: number
  consignee: string
  phone: string
  region: string
  address: string
}

interface ModalProps {
  title: string
  id?: number
  open: boolean
  onClose: () => void
  refetch: () => void
}

const CargoAddressFormModal = ({ title, open, onClose, id, refetch }: ModalProps) => {
  const requestHeader = { headers: { 'content-type': 'application/json' } }
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm<FieldType>()
  const [warehouseList, setWarehouseList] = useState()

  const fetchAddress = useCallback(async (id: number) => {
    setLoading(true)

    try {
      const { data } = await axios.get(
        `${config.get('API_BASE_URL')}/cargoAddress/${id}`,
        requestHeader,
      )
      form.setFieldsValue({
        ...data
      })
      setLoading(false)
    } catch (err) {
      setLoading(false)
      errorHandler(err)
    }
  }, [form])

  const fetChWarehouseList = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${config.get('API_BASE_URL')}/warehouse?orgId=1&state=ACTIVE&page=1&size=10`,
        requestHeader,
      )
      setWarehouseList(data?.list)
    } catch (err) {

      errorHandler(err)
    }
  }, [])

  useEffect(() => {
    if (id) {
      fetchAddress(id)
    } else {
      form.resetFields()
      fetChWarehouseList()
    }
  }, [id, fetchAddress, form])

  const handleSubmit = async () => {
    const data = form.getFieldsValue()

    try {

      if (id) {
        await axios.put(`${config.get('API_BASE_URL')}/cargoAddress/${id}`, JSON.stringify(data), requestHeader)
      } else {
        await axios.post(`${config.get('API_BASE_URL')}/cargoAddress/`, JSON.stringify(data), requestHeader)
      }
      notification.success({
        message: 'Амжилттай хадгаллаа',
      })
      refetch()
      onClose()

    } catch (err) {
      errorHandler(err)
    }

  }

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleSubmit}
      closable={{ 'aria-label': 'Custom Close Button' }}
      onCancel={() => onClose()}
      okText={'Хадгалах'}
      cancelText={'Хаах'}
    >
      {loading ? (
        <Skeleton />
      ) : (
        <Form form={form} name="Organization">
          {id ? null : <Form.Item<FieldType> name="warehouseId" label="Агуулах сонгох">
            <Select
              placeholder='Агуулах сонгох'>
              {
                (warehouseList || []).map((address: any) => {
                  return <Select.Option key={address.id} value={address.id}>{address.name}</Select.Option>
                })
              }
            </Select>
          </Form.Item>}
          <Form.Item<FieldType> name="consignee" label="Хүлээн авагч">
            <Input placeholder='烸嵪 (Your number)' />
          </Form.Item>
          <Form.Item<FieldType> name="phone" label="Утас">
            <Input placeholder='Байгууллагын дугаар' />
          </Form.Item>
          <Form.Item<FieldType> name="region" label="Бүс нутаг">
            <Input placeholder='内蒙古自治区 锡林郭勒盟 二连浩特市社区建设管理局' />
          </Form.Item>
          <Form.Item<FieldType> name="address" label="Дэлгэрэнгүй хаяг">
            <Input placeholder='"浩特汇通物流园区C05号 (Өөрийн утасны дугаар)' />
          </Form.Item>
        </Form>
      )}
    </Modal>
  )
}

export default CargoAddressFormModal