import { Fragment, useCallback, useContext, useEffect, useState } from 'react'
import { ListState } from '../utils/commonTypes'
import config, { requestHeader } from '../config'
import axios from 'axios'
import OrganizationContext from '../context/OrganizationProvider'
import { errorHandler } from '../component/Utilities'
import { WareHouseIcon } from '../utils/icons'
import { Link } from 'react-router'
import { Skeleton } from 'antd'

const SelectWarehous = () => {
  const { org } = useContext(OrganizationContext)
  const [state, updateState] = useState<ListState>({
    loading: true,
    list: [],
  })

  const fetchList = useCallback(async () => {
    updateState((prev) => ({ ...prev, loading: true }))

    try {
      const { data } = await axios.get(
        `${config.get('API_BASE_URL')}/warehouse?orgId=${org?.id}&state=ACTIVE&page=1&size=10`,
        requestHeader,
      )

      updateState({
        loading: false,
        list: data.list || [],
      })
    } catch (err) {
      updateState((prev) => ({ ...prev, loading: false }))
      errorHandler(err)
    }
  }, [])

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="max-w-[1280px] mx-auto p-4 py-12 space-y-12">
      <div className="grid gap-1 text-black">
        <h1 className="text-xl font-semibold ">Бүртгэлтэй агуулахууд</h1>
        <p className="text-sm font-normal">Ачаа бүртгэхийн тулд агуулах сонгоно уу!</p>
      </div>
      {state.loading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {(state?.list || []).map((item) => {
            return (
              <Link
                to={`/selectWarehouse/${item?.id}/package`}
                key={item.id}
                className="border rounded-xl p-6 cursor-pointer bg-white hover:bg-gray-200 transition-all duration-200 ease-in-out space-y-4"
              >
                <div className="grid gap-3">
                  <span className="stroke stroke-black">
                    <WareHouseIcon size="24" />
                  </span>
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
                <div>{item.address}</div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SelectWarehous
