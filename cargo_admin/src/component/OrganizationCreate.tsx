import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'
import ImageUpload from './imageUpload'
import { useState } from 'react'
import { Form, Input, Modal, notification, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import config from '../config'
import { errorHandler } from './Utilities'

dayjs.locale('mn')
dayjs.extend(dayLocaleData)

const OrganizationCreate = (props: any) => {
  type FieldType = {
    name: string
    slug: string
    phone: string
    address: string
    email: string
    workingHours: string
    socialLinks: string
    socialName: string
    // logoUrl?: string
  }
  const requestHeader = { headers: { 'content-type': 'application/json' } }
  const [singleImage, setSingleImage] = useState<Blob>()
  const [organization, setOrganization] = useState<any>()
  const [form] = Form.useForm()

  const handleCategoryCreateButtonClick = () => {
    const data = form.getFieldsValue()
    const body = { ...data, logoUrl: singleImage, socialLinks: { url: data?.socialLinks, name: data?.socialName } }
    console.info('body=>', body)
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    axios
      .post(`${config.get('API_BASE_URL')}/organization`, JSON.stringify(body), requestConfig)
      .then((res) => {
        notification.success({
        message: 'Амжилттай '
        })
        props?.hideFunction()
      })
      .catch((err) => errorHandler(err))
  }

  return (
    <>
      <Modal
        title={props.title}
        open={props.visible}
        onOk={handleCategoryCreateButtonClick}
        closable={{ 'aria-label': 'Custom Close Button' }}
        // onCancel={() => clearData()}
        okText={props.okText}
        cancelText={props.cancelText}
      >
        <Form form={form} name="Organization">
          <Form.Item<FieldType> name="name" label="нэр">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="slug" label="slug">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="phone" label="phone">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="address" label="address">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="email" label="email">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="workingHours" label="workingHours">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="socialName" label="social name">
            <Input />
          </Form.Item>
          <Form.Item<FieldType> name="socialLinks" label="social links">
            <Input />
          </Form.Item>
          <Form.Item label="Organization зураг">
            <div className="flex">
              <p className="mt-1.5">5Mb -аас хэтрэхгүй [16 / 8] харьцаатай jpeg, jpg, png зураг</p>
              <Tooltip
                title="Сайтын нүүр, ангилал, хайлт, таны дэлгүүр зэрэгт гарах дөрвөлжин зураг, 
                мөн дэлгэрэнгүй хуудасны дээд хэсэгт орох танилцуулга Зургууд!"
                className="mt-2.5"
              >
                <QuestionCircleOutlined className="ml-1" />
              </Tooltip>
            </div>
            <ImageUpload singleImage={singleImage} setSingleImage={setSingleImage} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default OrganizationCreate
