import { Upload, Button, UploadProps } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import config from '../config'

const ImageUpload = (props: any) => {

    const uploadProps: UploadProps = {
    name: 'file', // Энэ нь backend талын @FileInterceptor('file')-тай таарах ёстой
    action: `${config.get('API_BASE_URL')}/upload/image`,
    headers: {
      // Authorization эсвэл өөр custom headers хэрэгтэй бол энд
    },
    onChange(info: any) {
        console.info("🚀 ~ onChange ~ info:", info)
        if (info.file.status === 'done') {
        //   filename
        console.info(`${info.file.name} амжилттай upload хийгдлээ`)
         props?.setSingleImage(info.file.response?.filename) 
      } else if (info.file.status === 'error') {
        console.error(`${info.file.name} upload амжилтгүй боллоо`)
      }
    },
    maxCount: 1, // Зөвхөн нэг зураг
    accept: 'image/*', // Зөвхөн зураг
  }

      return (
    <Upload {...uploadProps}>
      <Button icon={<UploadOutlined />}>Зураг Upload хийх</Button>
    </Upload>
  )
}
export default ImageUpload
