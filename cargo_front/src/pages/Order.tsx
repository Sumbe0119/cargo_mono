import { useState, useEffect, useCallback } from 'react'
import OrderModal from '../components/shared/OrderModal'
import { EditModalState } from '../components/assets/enums'
import { API } from '../components/api'
import queryString from 'query-string'
import toast from 'react-hot-toast'
import moment from 'moment'
import { getFormatMoney, getRenderPackageText } from '../components/utils/common'

const list = [
  { key: 'REGISTERED', value: 'Бүртгэгдсэн' },
  { key: 'RECEIVED', value: 'УБ агуулах' },
  { key: 'SENT', value: 'ЭРЭЭН-УБ' },
  { key: 'DELIVERED', value: 'Хүргэлт' },
  { key: 'FINISHED', value: 'Захиалга дууссан' },
  { key: 'BROKEN', value: 'Эвдэрсэн' },
]

const Order = () => {
  const [edit, updateEdit] = useState<EditModalState>({ visible: false })
  const [filter, setFilter] = useState({ status: '' })
  const [state, setState] = useState<any>({ loading: false })

  const fetchOrder = useCallback(async () => {
    const _filter = queryString.stringify(filter)
    setState({ loading: true })
    try {
      const response = await API.get({ apiVersion: 'core' })(`/package${filter.status !== '' ? '?' + _filter : ''}`)
      setState({ list: response?.list, loading: false })
    } catch (error: any) {
      toast.error(error.message)
      setState({ loading: true })
    }
  }, [filter])

  useEffect(() => {
    fetchOrder()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  return (
    <>
      <div className="flex flex-col gap-6 w-full xs:px-6">
        <h2 className="text-lg font-semibold text-primary">Барааны төлөв</h2>

        <div className="grid xs:grid-cols-2 lg:grid-cols-4 items-center gap-3">
          <div
            onClick={() => setFilter({ status: '' })}
            className={`group flex items-center justify-center h-8 rounded-lg px-3 cursor-pointer hover:bg-dark transition-all ${
              filter.status === '' ? 'bg-dark' : 'bg-dark/10'
            }`}
          >
            <p
              className={`text-sm font-medium leading-none transition-colors ${filter.status === '' ? 'text-white' : 'text-dark group-hover:text-white'}`}
            >
              Бүгд
            </p>
          </div>
          {list.map((item, index) => {
            const isActive = filter.status === item.key
            return (
              <div
                key={index}
                onClick={() => setFilter({ status: item.key })}
                className={`float-right group flex items-center justify-center h-8 rounded-lg px-3 cursor-pointer hover:bg-dark transition-all ${
                  isActive ? 'bg-dark' : 'bg-dark/10'
                }`}
              >
                <p className={`text-sm font-medium leading-none transition-colors ${isActive ? 'text-white' : 'text-dark group-hover:text-white'}`}>
                  {item.value}
                </p>
              </div>
            )
          })}
        </div>

        {state?.list?.length ? <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-3">
          {state?.list?.map((item: any, index: number) => {
            return (
              <div key={index} onClick={() => updateEdit({ visible: true })} className="border border-light rounded-lg p-4 leading-none">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-warning"></span>
                    <p className="text-sm font-medium text-dark">{item?.trackCode}</p>
                  </div>
                  <p className="text-sm font-light text-dark">{moment(item?.updatedAt).format(`YYYY/MM/DD`)}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs font-regular text-dark/80">{getRenderPackageText(item?.status)}</p>
                  <p className="text-sm font-medium text-dark">{getFormatMoney(item?.price)}</p>
                </div>
              </div>
            )
          })}
        </div>:
        <div className="flex flex-col items-center justify-center py-16 text-dark/50 w-full">
          <p className="text-sm font-medium text-black">Жагсаалт хоосон байна</p>
          <p className="text-xs text-dark/40">Одоогоор харуулах мэдээлэл алга байна</p>
        </div>
        }
      </div>

      <OrderModal open={edit.visible} onClose={() => updateEdit({ visible: false })} />
    </>
  )
}

export default Order
