import Modal from './Modal'
import { BoxIcon, CarIcon, WareHouseIcon } from '../assets/icons'
import { getFormatMoney, getRenderPackageText } from '../utils/common'
import toast from 'react-hot-toast'
import { ItemStatus } from '../assets/enums'

interface Props {
  open: boolean
  onClose: () => void
  list: any[]
}

const getRenderPackageIcon = (status: ItemStatus) => {
  if (status === ItemStatus.REGISTERED) {
    return <BoxIcon />
  } else if (status === ItemStatus.RECEIVED) {
    return <WareHouseIcon />
  } else if (status === ItemStatus.SENT) {
    return <CarIcon />
  } else {
    return null
  }
}

const CheckProductsModal = ({ open, onClose, list }: Props) => {
  console.log('🚀 ~ CheckProductsModal ~ list:', list)

  const handleDelivery = () => {
    onClose()
    const _toast = toast.loading('Та хаяг аа холбоогүй байна Профайл цэс дээр дараад өөрийн нэрлүү орж хаяг аа оруулна уу')

    setTimeout(() => {
      toast.dismiss(_toast)
    }, 7000)
  }

  return (
    <Modal open={open} onClose={() => onClose()}>
      <div className="block xs:w-screen lg:w-[500px] xs:p-4 lg:p-8 space-y-4">
        <div className="flex-col flex divide-y divide-y-light">
          {(list || []).map((item, index) => {
            return (
              <div key={index}>
                <div className="flex items-center justify-between py-3">
                  <div className="flex gap-3">
                    <span className="stroke-black">{getRenderPackageIcon(item?.status)}</span>
                    <div className="flex-col flex gap-1 leading-none">
                      <p className="text-black font-medium text-sm">{item.trackCode}</p>
                      <span className="text-dark font-regular text-sm">{getFormatMoney(item.price)}</span>
                    </div>
                  </div>
                  <div className="h-9 text-sm text-white bg-primary/80 rounded-md flex items-center justify-center px-3">
                    <p>{getRenderPackageText(item?.status)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {/* <div
          onClick={() => handleDelivery()}
          className="bg-warning hover:bg-[#e3aa01] w-full rounded-xl h-12 flex gap-2 items-center justify-center cursor-pointer transition duration-200 ease-in"
        >
          <span className="font-semibold text-base text-black">Хүргэлтээр авах</span>
        </div> */}
      </div>
    </Modal>
  )
}

export default CheckProductsModal
