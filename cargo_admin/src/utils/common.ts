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

