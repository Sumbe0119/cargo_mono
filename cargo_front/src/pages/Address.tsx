import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowIcon, WareHouseIcon } from "../components/assets/icons";
import toast from "react-hot-toast";
import OrganizationContext from "../components/provider/OrganizationProvider";
import { API } from "../components/api";
import { CommonState } from "../components/assets/enums";

interface StateType {
  loading: boolean,
  list: any[]
}

const Address = () => {
  const { org } = useContext(OrganizationContext)
  const [state, setState] = useState<StateType>({ loading: false, list: [] })

  const fetchList = useCallback(async () => {

    setState({ ...state, loading: true })
    try {
      const response = await API.get({ apiVersion: 'core' })(`/warehouse?orgId=${org?.id}&state=${CommonState.ACTIVE}`)

      setState({ list: response?.list, loading: false })
    } catch (error: any) {
      toast.error(error.message)
      setState({ ...state, loading: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {

    fetchList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="simple-container xs:px-4 lg:px-0 xs:space-y-3 lg:space-y-12 xs:mt-6 lg:mt-24">

      {state?.list?.length ?
        <>
          <h1 className="grid gap-1 leading-3">
            <span className="text-sm font-medium text-black">
              Агуулахын жагсаалт
            </span>
            <span className="text-base leading-tight font-semibold text-primary">
              Та өөрт тохирох агуулхыг сонгоорой
            </span>
          </h1>
          <div className="grid xs:grid-cols-1 lg:grid-cols-2 xs:gap-3 lg:gap-6">
            {(state?.list || []).map((item: any, index: number) => {
              return (
                <Link
                  key={`branch_${index}`}
                  to={`/branch/${item?.id}`}
                  className="flex flex-col gap-3 rounded-lg overflow-hidden border border-light hover:border-primary transition-all p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded bg-primary/80 flex items-center justify-center">
                        <span className="stroke stroke-white">
                          <WareHouseIcon />
                        </span>
                      </div>
                      <div className="grid gap-0 text-sm font-medium text-black">
                        Холбоо барих
                        <p className="text-sm font-light leading-5 text-dark">{item?.contactInfo?.phone}</p>
                      </div>
                    </div>
                    <div className="rotate-180 flex items-center h-9 w-9 border border-light rounded fill-transparent cursor-pointer hover:bg-light transition-all justify-center stroke stroke-dark">
                      <ArrowIcon />
                    </div>
                  </div>

                  <div className={`grid gap-1 text-black`}>
                    <h6 className="text-sm text-primary font-medium line-clamp-1 uppercase">
                      {item?.name}
                    </h6>
                    <span className="text-sm font-normal line-clamp-3">
                      {item?.address}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
        : <div className="pt-20 flex-col flex items-center justify-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 22 22"
          >
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 3V1m6 18v2M3 8H1m18 6h2M3.914 3.914 2.5 2.5m15.586 15.586L19.5 19.5M11 16.657l-2.121 2.121a4 4 0 1 1-5.657-5.657L5.343 11m11.314 0 2.121-2.121a4 4 0 1 0-5.657-5.657L11 5.343"
            ></path>
          </svg>
          <p className="text-sm font-medium text-black">Агуулах холбоогүй байна</p>
          <Link to={`/`} className="text-sm font-light text-primary underline cursor-pointer">
            Нүүр хуудас
          </Link>
        </div>}
    </div>
  );
};

export default Address;
