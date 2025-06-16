import React, { Fragment, useState } from 'react'
import CustomSelect from '../../shared/CustomSelect'
import CustomInput from '../../shared/CustomInput'
import CustomButton from '../../shared/CustomButton'
import toast from 'react-hot-toast'
import CheckProductsModal from '../../shared/CheckProductsModal'
import { API } from '../../api'

enum SearchType {
  PHONE = 'phone',
  TRACK_CODE = 'trackCode',
}

const CheckProducts = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchBy, setSearchBy] = useState<SearchType>(SearchType.PHONE)
  const [searchValue, setSearchValue] = useState('')
  const [state, updateState] = useState<any>({ list: [], total: 0 })

  const onSubmit = async () => {
    setLoading(true)

    const payload = searchBy === SearchType.PHONE ? { phone: searchValue } : { trackCode: searchValue }

    try {
      const response = await API.post({ apiVersion: 'core' })('/package/check', payload)
      updateState({
        list: response.list,
        total: response.total || 0,
      })

      if (!response?.list?.length) {
        toast.error(`Бүртгэлтэй бараа байхгүй байна.`)
        return
      }

      setVisible(true)
    } catch (error: any) {
      toast.error(`ERROR: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCheck = () => {
    if (!searchValue) {
      toast.error(`${searchBy === SearchType.PHONE ? 'Утасны дугаар' : 'Трак код'} оруулна уу`)
      return
    }

    onSubmit()
  }

  return (
    <Fragment>
      <div className="space-y-9">
        <div className="grid gap-6">
          <h2 className="xs:hidden lg:grid gap-1">
            <span className="text-base font-medium text-primary">Бараа хайх</span>
            <span className="text-sm leading-tight font-normal text-black">
              Та захиалсан бараагаа утасны дугаар эсвэл трак кодоор хайх боломжтой.
            </span>
          </h2>
          <div className="flex-col flex gap-4">
            <CustomSelect value={searchBy} onChange={(e: any) => setSearchBy(e.target.value)}>
              <option value={SearchType.PHONE}>Утасны дугаараар</option>
              <option value={SearchType.TRACK_CODE}>Трак кодоор</option>
            </CustomSelect>
            <CustomInput
              placeholder={`${searchBy === SearchType.PHONE ? 'Утасны дугаар' : 'Трак код'} оруулна уу`}
              onChange={(e: any) => setSearchValue(e)}
              value={searchValue}
            />
            <CustomButton title="Шалгах" loading={loading} onClick={handleCheck} />
          </div>
        </div>
      </div>
      {visible && <CheckProductsModal open={visible} list={state?.list} onClose={() => setVisible(false)} />}
    </Fragment>
  )
}

export default CheckProducts
