import { notification } from 'antd'


const errorHandler = (error: any) => {
  if (error.response) {
    console.info(error.response)
    // Request made and server responded
    if (error.response.status === 500) {
      notification.error({
        message: '500 кодтой алдаа гарлаа.',
        description: error.response?.data?.message || 'Админтай холбогдно уу.',
      })
    }
    if (error.response.status === 400) {
      notification.error({
        message: error?.response?.data?.message,
        description: JSON.stringify(error?.response?.data?.conflicts) || '',
      })
    }
    if (error.response.status === 401) {
      notification.error({
        message: 'Хэрэглэгчийг таньсангүй.',
        description: error.response?.data?.message || 'Хэрэглэгчийн мэдээлэл олдсонгүй тул дахин системд нэвтэрнэ үү.',
      })
    }
    if (error.response.status === 403) {
      notification.error({
        message: 'Хандах эрх хангалтгүй.',
        description: error.response?.data?.message || 'Хэрэглэгчийн хандах эрх хангалтгүй байна.',
      })
    }
    if (error.response.status === 404) {
      notification.error({
        message: 'Мэдээлэл олдсонгүй.',
        description: error.response?.data?.message || 'Таны хүссэн мэдээлэл байхгүй эсвэл устсан байна.',
      })
    }
  } else if (error.request) {
    // The request was made but no response was received
    console.info(error.request)
    notification.error({
      message: 'Холболт салсан байна.',
      description: error.response?.data?.message || 'Сервертэй холболт салсан байна. Интернэтэд холбогдсон эсэхээ шалгана уу.',
    })
  } else {
    // Something happened in setting up the request that triggered an Error
    notification.error({
      message: 'Алдаа гарлаа.',
      description: error.response?.data?.message || 'Үл мэдэгдэх алдаа гарлаа. Админтай холбогдно уу.',
    })
  }
}



export { errorHandler }
