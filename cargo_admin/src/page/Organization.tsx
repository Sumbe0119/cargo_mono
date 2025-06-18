import dayjs from 'dayjs'
import 'dayjs/locale/mn'
import dayLocaleData from 'dayjs/plugin/localeData'
import { useState } from 'react'
import OrganizationCreate from '../component/OrganizationCreate'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

dayjs.locale('mn')
dayjs.extend(dayLocaleData)

const Organization = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div>
      <Button
        className="float-right mt-4 textColor"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpenModal(true)}
      >
        нэмэх
      </Button>

      {openModal && (
        <OrganizationCreate
          title="Organization нэмэх"
          okText="Хадгалах"
          cancelText="Хаах"
          visible={openModal}
          hideFunction={() => setOpenModal(false)}
        />
      )}
    </div>
  )
}

export default Organization
