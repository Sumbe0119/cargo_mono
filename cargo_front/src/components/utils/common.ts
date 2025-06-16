import { imageUrl } from '../api/config'
import { ItemStatus } from '../assets/enums'

export const getFormatMoney = (price: any) => {
  if (!price) {
    return '0₮'
  }

  const contain = price.toString().includes('.')

  if (contain === true) {
    const pieces = price.split('.')
    return pieces.length > 0 ? pieces[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₮' : ' '
  } else {
    const pieces = price.toString()
    return pieces.length > 0 ? pieces.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '₮' : ' '
  }
}

export const getFormatYuan = (price: any) => {
  if (!price) {
    return '0¥'
  }

  const contain = price.toString().includes('.')

  if (contain === true) {
    const pieces = price.split('.')
    return pieces.length > 0 ? pieces[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '¥' : ' '
  } else {
    const pieces = price.toString()
    return pieces.length > 0 ? pieces.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '¥' : ' '
  }
}

export const getImageUrl = (image: string) => {
  return `${imageUrl()}${image}`
}

export const getRenderPackageText = (status: ItemStatus) => {
  if (status === ItemStatus.REGISTERED) {
    return 'Бүртгэж авсан'
  } else if (status === ItemStatus.RECEIVED) {
    return 'УБ агуулах'
  } else if (status === ItemStatus.FINISHED) {
    return 'УБ агуулах'
  } else if (status === ItemStatus.SENT) {
    return 'Замд гарсан'
  } else if (status === ItemStatus.DELIVERED) {
    return 'Хүргэлтэнд гарсан'
  } else if (status === ItemStatus.BROKEN) {
    return 'Эвдэрсэн'
  } else if (status === ItemStatus.FINISHED) {
    return 'Захиалга дууссан'
  }
}
