import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'
import { Form, Input, Modal, notification, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import config from '../config'
import { errorHandler } from './Utilities'

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
  warehouseId: number
  open: boolean
  onClose: () => void
}

const CargoAddressCreate = ({ title, open, onClose, warehouseId }: ModalProps) => {
  const requestHeader = { headers: { 'content-type': 'application/json' } }

  const [form] = Form.useForm()

  const handleCategoryCreateButtonClick = () => {
    const data = form.getFieldsValue()

    axios
      .post(`${config.get('API_BASE_URL')}/organization`, JSON.stringify(data), requestHeader)
      .then(() => {
        notification.success({
          message: 'Амжилттай ',
        })
        onClose()
      })
      .catch((err) => errorHandler(err))
  }

  return (
    <>
      <Modal
        title={title}
        open={open}
        onOk={handleCategoryCreateButtonClick}
        closable={{ 'aria-label': 'Custom Close Button' }}
        onCancel={() => onClose()}
        okText={'Хадгалах'}
        cancelText={'Хаах'}
      >
        <Form form={form} name="Organization">
          <Form.Item<FieldType> name="warehouseId" label="Агуулхын ID">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="consignee" label="Хүлээн авагч">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="phone" label="Утас">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="region" label="Бүс нутаг">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="address" label="Дэлгэрэнгүй хаяг">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default CargoAddressCreate
