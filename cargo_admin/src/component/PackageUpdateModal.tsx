import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'
import { Checkbox, Form, Input, Modal, notification, Skeleton } from 'antd'
import axios from 'axios'
import config, { requestHeader } from '../config'
import { errorHandler } from './Utilities'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { PackageFieldType } from '../utils/commonTypes'
import OrganizationContext from '../context/OrganizationProvider'
import { MoneyIcon } from '../utils/icons'
import { getFormatMoney } from '../utils/common'
import { useParams } from 'react-router'
import UserContext from '../context/UserProvider'

dayjs.locale('mn')
dayjs.extend(dayLocaleData)

interface ModalProps {
  id?: number
  open: boolean
  onClose: () => void
  refetch: () => void
}

interface BoxDimensions {
  width: number
  height: number
  length: number
  weight: number
}

const PackageUpdateModal = ({ open, onClose, refetch, id }: ModalProps) => {
  const { warehouseId } = useParams()
  const { org } = useContext(OrganizationContext)
  const { user } = useContext(UserContext)

  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm<PackageFieldType>()
  const [currency, setCurrency] = useState<any>()
  console.log('🚀 ~ PackageUpdateModal ~ currency:', currency)
  // const [price, setPrice] = useState<number>()

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [dimensions, setDimensions] = useState<BoxDimensions>({
    weight: 0,
    height: 0,
    length: 0,
    width: 0,
  })
  console.log('🚀 ~ PackageUpdateModal ~ dimensions:', dimensions)

  const fetchWarehouse = useCallback(
    async (id: number) => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${config.get('API_BASE_URL')}/warehouse/${id}`, requestHeader)
        setCurrency(data?.data?.currency)
      } catch (err) {
        errorHandler(err)
      } finally {
        setLoading(false)
      }
    },
    [form],
  )
  const fetchPackage = useCallback(
    async (id: number) => {
      setLoading(true)
      try {
        const { data } = await axios.get(`${config.get('API_BASE_URL')}/package/${id}`, requestHeader)
        form.setFieldsValue({
          ...data,
        })
        setDimensions({
          width: Number(data?.width),
          height: Number(data?.height),
          length: Number(data?.length),
          weight: Number(data?.weight),
        })
      } catch (err) {
        errorHandler(err)
      } finally {
        setLoading(false)
      }
    },
    [id],
  )

  useEffect(() => {
    if (warehouseId) {
      fetchWarehouse(+warehouseId)
    }
    if(id){
      fetchPackage(+id)
    }
    
  }, [id, warehouseId])

  const handleInputChange = (field: keyof BoxDimensions, value: string) => {
    if (!/^\d*\.?\d*$/.test(value)) {
      setFormErrors((prev) => ({ ...prev, [field]: 'Зөвхөн тоо оруулна уу.' }))
      return
    }

    setDimensions((prev) => ({
      ...prev,
      [field]: value === '' ? 0 : Number(value),
    }))

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const packagePrice = useMemo(() => {
    const volumeM3 = (dimensions.height / 100) * (dimensions.length / 100) * (dimensions.width / 100)

    const priceByKg = dimensions?.weight * currency?.kg
    const priceByM3 = volumeM3 * (currency?.m3 * currency?.rate)

    return Math.ceil(Math.max(priceByKg, priceByM3) / 100) * 100
  }, [dimensions, id, form])

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields()

      // eslint-disable-next-line prefer-const
      const payload: any = {
        ...data,
        height: Number(data?.height),
        width: Number(data?.width),
        length: Number(data?.length),
        weight: Number(data?.weight),
        registeredById: Number(user?.orgMemberId),
        warehouseId: Number(warehouseId),
        price: packagePrice,
        organizationId: Number(org?.id),
        isExpress: false,
        deliveryRequested: false,
      }

      await axios.put(`${config.get('API_BASE_URL')}/package/${id}`, payload, requestHeader)

      notification.success({ message: `Амжилттай`, description: 'хадгаллаа' })
      onClose()
      refetch()
    } catch (err: any) {
      notification.error({
        message: 'Алдаа гарлаа.',
        description: err.errorFields || errorHandler(err),
      })
    }
  }

  return (
    <Modal
      title={'Бараа засах'}
      open={open}
      onOk={handleSubmit}
      closable
      onCancel={onClose}
      okText={'Хадгалах'}
      cancelText="Хаах"
      className="custom-modal"
    >
      <div className="border-t border-gray-200 py-6 px-5">
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <Form form={form} layout="vertical" initialValues={{ broken: false, notes: '' }}>
              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  name="height"
                  label="Өндөр"
                  className="mb-0"
                  rules={[{ required: true, message: 'Өндөр оруулна уу!' }]}
                >
                  <Input
                    onChange={(e: any) => handleInputChange('height', e?.target?.value)}
                    inputMode="numeric"
                    placeholder="Өндөр /см/"
                  />
                </Form.Item>
                <Form.Item
                  name="width"
                  label="Өргөн"
                  className="mb-0"
                  rules={[{ required: true, message: 'Өргөн оруулна уу!' }]}
                >
                  <Input
                    onChange={(e: any) => handleInputChange('width', e?.target?.value)}
                    inputMode="numeric"
                    placeholder="Өргөн /см/"
                  />
                </Form.Item>
                <Form.Item
                  name="length"
                  label="Урт"
                  className="mb-0"
                  rules={[{ required: true, message: 'Урт оруулна уу!' }]}
                >
                  <Input
                    onChange={(e: any) => handleInputChange('length', e?.target?.value)}
                    inputMode="numeric"
                    placeholder="Урт /см/"
                  />
                </Form.Item>
                <Form.Item
                  name="weight"
                  label="Жин"
                  className="mb-0"
                  rules={[{ required: true, message: 'Жин оруулна уу!' }]}
                >
                  <Input
                    onChange={(e: any) => handleInputChange('weight', e?.target?.value)}
                    inputMode="numeric"
                    placeholder="Жин"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Утас"
                  className="mb-0"
                  rules={[{ required: true, message: 'Утас оруулна уу!' }]}
                >
                  <Input placeholder="Утас" />
                </Form.Item>
                <Form.Item
                  name="trackCode"
                  label="Баркод"
                  className="mb-0"
                  rules={[{ required: true, message: 'Баркод оруулна уу!' }]}
                >
                  <Input placeholder="Баркод" />
                </Form.Item>
              </div>

              <Form.Item name="notes" label="Тэмдэглэл" className="mt-4">
                <TextArea placeholder="Тэмдэглэл" autoSize={{ minRows: 2, maxRows: 5 }} />
              </Form.Item>

              <Form.Item name="broken" valuePropName="checked" className="mt-2">
                <Checkbox>Эвдэрсэн эсэх</Checkbox>
              </Form.Item>
            </Form>
            <div className="flex border border-gray-300 rounded-lg p-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-none h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 bg-white">
                  <span className="stroke-2 stroke-gray-500 fill-none">
                    <MoneyIcon size="22" />
                  </span>
                </div>
                <div className="flex flex-col gap-0 font-medium text-sm">
                  Барааны үнэ:
                  <p className="font-normal max-w-[300px] leading-5">Автоматаар бодогдох болно</p>
                </div>
              </div>
              <span className="text-lg font-bold ml-2">{getFormatMoney(packagePrice)}</span>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default PackageUpdateModal
