import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'
import { Form, Input, Modal, notification, Skeleton } from 'antd'
import axios from 'axios'
import config, { requestHeader } from '../config'
import { errorHandler } from './Utilities'
import { useCallback, useEffect, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { WarehouseFieldType } from '../utils/commonTypes'

dayjs.locale('mn')
dayjs.extend(dayLocaleData)

interface ModalProps {
  title: string
  id?: number
  open: boolean
  onClose: () => void
  refetch: () => void
}

const WarehouseFormModal = ({ title, open, onClose, id, refetch }: ModalProps) => {

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm<WarehouseFieldType>()

  const fetchWarehouse = useCallback(async (id: number) => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        `${config.get('API_BASE_URL')}/warehouse/${id}`,
        requestHeader,
      )
      form.setFieldsValue(data?.data)
    } catch (err) {
      errorHandler(err)
    } finally {
      setLoading(false)
    }
  }, [form])

  useEffect(() => {
    if (id) {
      fetchWarehouse(id)
    } else {
      form.resetFields()
    }
  }, [id, form])

  const handleSubmit = async () => {
    try {
      const payload = await form.validateFields()
      console.log("🚀 ~ handleSubmit ~ values:", payload)

      // if (id) {
      //   await axios.put(
      //     `${config.get('API_BASE_URL')}/warehouse`,
      //     payload,
      //     requestHeader
      //   )
      // } else {
      //   await axios.post(
      //     `${config.get('API_BASE_URL')}/warehouse`,
      //     payload,
      //     requestHeader
      //   )
      // }

      // notification.success({ message: 'Амжилттай хадгаллаа' })
      // onClose()
      // refetch()
    } catch (err) {
      errorHandler(err)
    }
  }

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleSubmit}
      closable
      onCancel={onClose}
      okText="Хадгалах"
      cancelText="Хаах"
    >
      {loading ? (
        <Skeleton />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Нэр">
            <Input placeholder="Your warehouse name" />
          </Form.Item>
          <Form.Item name="address" label="Агуулахын хаяг">
            <TextArea placeholder="Дэлгэрэнгүй хаяг" autoSize={{ minRows: 2, maxRows: 5 }} />
          </Form.Item>
          <Form.Item name="region" label="Бүс нутаг">
            <Input placeholder="Бүс нутаг" />
          </Form.Item>

          <div className='flex items-center gap-2 w-full'>
            <Form.Item name={['contactInfo', 'phone']} label="Утас">
              <Input placeholder="Утас" />
            </Form.Item>
            <Form.Item name={['contactInfo', 'email']} label="Имэйл">
              <Input placeholder="Имэйл" />
            </Form.Item>
            <Form.Item name="type" label="Агуулахын төрөл">
              <Input placeholder="Энгийн / Шуурхай" />
            </Form.Item>
          </div>

          <div className='flex gap-2'>
            <Form.Item name={['operatingHours', 'weekdays']} label="Ажлын өдөр">
              <Input placeholder="Ажлын өдөр" />
            </Form.Item>
            <Form.Item name={['operatingHours', 'weekends']} label="Амралтын өдөр">
              <Input placeholder="Амралтын өдөр" />
            </Form.Item>
            <Form.Item name="totalCapacity" label="Барааны багтаамж">
              <Input placeholder="Барааны багтаамж" />
            </Form.Item>
          </div>

          <div className='flex items-center gap-2'>
            <Form.Item name={['currency', 'kg']} label="Кг үнэ">
              <Input placeholder="Кг үнэ" />
            </Form.Item>
            <Form.Item name={['currency', 'm3']} label="М3 үнэлгээ">
              <Input placeholder="М3 үнэлгээ" />
            </Form.Item>
            <Form.Item name={['currency', 'rate']} label="Ханш">
              <Input placeholder="Ханш" />
            </Form.Item>
          </div>
        </Form>
      )}
    </Modal>
  )
}

export default WarehouseFormModal
