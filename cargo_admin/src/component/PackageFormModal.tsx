import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'
import { Checkbox, Form, Input, Modal, notification, Skeleton } from 'antd'
import axios from 'axios'
import config, { requestHeader } from '../config'
import { errorHandler } from './Utilities'
import { useCallback, useContext, useEffect, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { PackageFieldType } from '../utils/commonTypes'
import OrganizationContext from '../context/OrganizationProvider'
import { MoneyIcon } from '../utils/icons'
import { getFormatMoney } from '../utils/common'
import { useParams } from 'react-router'

dayjs.locale('mn')
dayjs.extend(dayLocaleData)

interface ModalProps {
  id?: number
  open: boolean
  onClose: () => void
  refetch: () => void
}

const PackageFormModal = ({ open, onClose, refetch, id }: ModalProps) => {

  const { warehouseId } = useParams()
  const { org } = useContext(OrganizationContext)



  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm<PackageFieldType>()
  const [currency, setCurrency] = useState<any>()
  console.log("🚀 ~ PackageFormModal ~ currency:", currency)

  const fetchWarehouse = useCallback(async (id: number) => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        `${config.get('API_BASE_URL')}/warehouse/${id}`,
        requestHeader,
      )
      setCurrency(data?.data?.currency)
    } catch (err) {
      errorHandler(err)
    } finally {
      setLoading(false)
    }
  }, [form])

  useEffect(() => {
    if (!id) {
      if (warehouseId) {
        fetchWarehouse(+warehouseId);
        return
      }

      notification.error({
        message: 'Алдаа',
        description: 'WAREHOUSEID олдсонгүй',
      });
    }
  }, [id, warehouseId]);


  const handleSubmit = async () => {
    try {
      const data = await form.validateFields()

      if (!currency) {
        notification.error({
          message: 'Алдаа',
          description: 'Валютын мэдээлэл олдсонгүй',
        });
        return;
      }


      const volumeM3 =
        (data.height / 100) *
        (data.length / 100) *
        (data.width / 100);


      const priceByKg = data?.weight * currency?.kg;
      const priceByM3 = volumeM3 * (currency?.m3 * currency?.rate);


      const payload = {
        ...data,
        registeredById: 1,
        warehouseId: Number(warehouseId),
        organizationId: Number(org?.id),
        price: Math.ceil(Math.max(priceByKg, priceByM3) / 100) * 100,
        isExpress: false,
        deliveryRequested: false
      }
      console.log("🚀 ~ handleSubmit ~ payload:", payload)



      // if (id) {
      //   await axios.put(
      //     `${config.get('API_BASE_URL')}/warehouse/${id}`,
      //     payload,
      //     requestHeader
      //   )
      // } else {
      //   await axios.post(
      //     `${config.get('API_BASE_URL')}/package`,
      //     payload,
      //     requestHeader
      //   )
      // }

      notification.success({ message: 'Амжилттай хадгаллаа' })
      onClose()
      refetch()
    } catch (err: any) {
      notification.error({
        message: 'Хэрэглэгчийг таньсангүй.',
        description: err.error || errorHandler(err)
      })
    }
  }

  return (
    <Modal
      title={'Бараа бүртгэх'}
      open={open}
      onOk={handleSubmit}
      closable
      onCancel={onClose}
      okText={id ? 'Хадгалах' : 'Бүртгэх'}
      cancelText="Хаах"
      className='custom-modal'
    >
      <div className='border-t border-gray-200 py-6 px-5'>

        {loading ? (
          <Skeleton />
        ) : (
          <>
            <Form form={form} layout="vertical">
              <div className="grid grid-cols-2 gap-3">
                <Form.Item name="height" label="Өндөр" className='mb-0'>
                  <Input inputMode="numeric" placeholder="Өндөр" />
                </Form.Item>
                <Form.Item name="width" label="Өргөн" className='mb-0'>
                  <Input inputMode="numeric" placeholder="Өргөн" />
                </Form.Item>
                <Form.Item name="weight" label="Жин" className='mb-0'>
                  <Input inputMode="numeric" placeholder="Жин" />
                </Form.Item>
                <Form.Item name="length" label="Урт" className='mb-0'>
                  <Input inputMode="numeric" placeholder="Урт" />
                </Form.Item>
                <Form.Item name="phone" label="Утас" className='mb-0'>
                  <Input placeholder="Утас" />
                </Form.Item>
                <Form.Item name="trackCode" label="Баркод" className='mb-0'>
                  <Input placeholder="Баркод" />
                </Form.Item>
              </div>

              <Form.Item name="notes" label="Тэмдэглэл" className="mt-4">
                <TextArea placeholder="Тэмдэглэл" autoSize={{ minRows: 2, maxRows: 5 }} />
              </Form.Item>

              <Form.Item
                name="broken"
                valuePropName="checked"
                className="mt-2"
              >
                <Checkbox>Эвдэрсэн эсэх</Checkbox>
              </Form.Item>
            </Form>
            <div className='flex border border-gray-300 rounded-lg p-4 items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex-none h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 bg-white'>
                  <span className='stroke-2 stroke-gray-500 fill-none'>
                    <MoneyIcon size='22' />
                  </span>
                </div>
                <div className='flex flex-col gap-0 font-medium text-sm'>
                  Барааны үнэ:
                  <p className='font-normal max-w-[300px] leading-5'>Автоматаар бодогдох болно</p>
                </div>
              </div>
              <span className='text-lg font-bold ml-2'>{getFormatMoney(5000)}</span>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}

export default PackageFormModal
