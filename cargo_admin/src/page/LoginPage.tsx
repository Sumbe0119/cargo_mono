import React, { useContext } from 'react'
import { Form, Input, Button, Typography, notification } from 'antd'
import axios from 'axios'
import config, { requestHeader } from '../config'
import { errorHandler } from '../component/Utilities'
import UserContext from '../context/UserProvider'
import { useNavigate } from 'react-router'

const { Title } = Typography

const LoginForm: React.FC = () => {
  const { changeUser } = useContext(UserContext)
  const navigate = useNavigate()

  const onFinish = async (values: any) => {


    try {
      const { data } = await axios.post(`${config.get('API_BASE_URL')}/auth/login`, values, requestHeader)
      notification.success({ message: `Сайн байна уу`, description: ` ${data?.user?.username}` })

      localStorage.setItem('token', data.token)

      if (changeUser) {
        changeUser(data?.user)
      }

      navigate('/')

    } catch (err: any) {
      notification.error({
        message: 'Нэвтэрхэд алдаа гарлаа.',
        description: err.errorFields || errorHandler(err),
      })
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="w-full max-w-sm rounded-xl p-6 border border-gray-200">
        <Title level={3} className="text-center mb-4">
          Нэвтрэх
        </Title>
        <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Утасны дугаар"
            name="phone"
            rules={[
              { required: true, message: 'Утасны дугаараа оруулна уу' },
              { pattern: /^[0-9]{8}$/, message: 'Дугаараа зөв оруулна уу' },
            ]}
          >
            <Input placeholder="Утасны дугаар" />
          </Form.Item>

          <Form.Item label="Нууц үг" name="password" rules={[{ required: true, message: 'Нууц үгээ оруулна уу' }]}>
            <Input.Password placeholder="Нууц үг" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Нэвтрэх
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginForm
