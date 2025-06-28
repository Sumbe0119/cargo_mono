import React, { useCallback, useContext, useEffect, useState } from 'react'
import CustomButton from '../../shared/CustomButton';
import {
  AddressIcon,
  ArrowIcon,
  CheckIcon,
  CopyIcon,
  ImportUserIcon,
  LocationIcon,
  PhoneIcon,
  ZipCodeIcon,
} from '../../assets/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { API } from '../../api';
import OrganizationContext from '../../provider/OrganizationProvider';

interface StateType {
  loading: boolean,
  data: any
}

interface Props {
  warehouseId: number
}

const CargoAddress = ({ warehouseId }: Props) => {

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { org } = useContext(OrganizationContext)
  const [state, setState] = useState<StateType>({ loading: false, data: {} })
  const [copiedFields, setCopiedFields] = useState<{ [key: string]: boolean }>({});

  const fetchOrder = useCallback(async () => {
    setState({ ...state, loading: true })
    try {
      const response = await API.get({ apiVersion: 'core' })(`/cargoAddress/${warehouseId}`)
      setState({ data: response, loading: false })
    } catch (error: any) {
      toast.error(error.message)
      setState({ ...state, loading: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (warehouseId) {
      fetchOrder()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedFields((prev) => ({ ...prev, [field]: true }));
      toast.success(`${field} амжилттай хуулсан`);
    }).catch(() => {
      toast.error("Хуулахад алдаа гарлаа");
    });
  };


  return (
    <div className="simple-container xs:space-y-3 lg:space-y-12 xs:px-5 lg:px-0 xs:mt-6 lg:mt-24">
      <div className="xs:hidden lg:flex gap-6">
        {pathname === '/address' ? null : <div
          onClick={() => navigate("/address")}
          className="flex items-center h-10 w-10 border border-light rounded fill-transparent cursor-pointer hover:bg-light transition-all justify-center stroke stroke-dark"
        >
          <ArrowIcon />
        </div>}
        <h1 className="grid gap-1 leading-3">
          <span className="text-sm font-medium text-black">{org?.name}</span>
          <span className="text-base leading-tight font-semibold text-primary">
            {state?.data?.warehouse?.name || 'Салбарын нэр'}
          </span>
        </h1>
      </div>
      <div className="flex-col flex gap-4">
        <div className="flex-col flex gap-3">
          <label className="text-sm font-light text-dark">
            收件人 (Хүлээн авагч)
          </label>
          <div className="flex items-center justify-between border border-light rounded-lg px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="stroke stroke-primary">
                <ImportUserIcon />
              </span>
              <p>{state?.data?.consignee}</p>
            </div>
            <span
              onClick={() => copyToClipboard(state?.data?.consignee, "Хүлээн авагч")}
              className="stroke stroke-primary cursor-pointer"
            >
              {copiedFields["Хүлээн авагч"] || copiedFields["Бүгд"] ? <CheckIcon /> : <CopyIcon />}
            </span>
          </div>
        </div>
        <div className="flex-col flex gap-3">
          <label className="text-sm font-light text-dark">电话 (Утас)</label>
          <div className="flex items-center justify-between border border-light rounded-lg px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="stroke stroke-primary">
                <PhoneIcon />
              </span>
              <p>{state?.data?.phone}</p>
            </div>
            <span
              onClick={() => copyToClipboard(state?.data?.phone, "Утас")}
              className="stroke stroke-primary cursor-pointer"
            >
              {copiedFields["Утас"] || copiedFields["Бүгд"] ? <CheckIcon /> : <CopyIcon />}
            </span>
          </div>
        </div>
        <div className="flex-col flex gap-3">
          <label className="text-sm font-light text-dark">
            所在地区 (Бүс нутаг)
          </label>
          <div className="flex items-center justify-between border border-light rounded-lg px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="stroke stroke-primary">
                <LocationIcon />
              </span>
              <p>{state?.data?.region}</p>
            </div>
            <span
              onClick={() => copyToClipboard(state?.data?.region, "Бүс нутаг")}
              className="stroke stroke-primary cursor-pointer"
            >
              {copiedFields["Бүс нутаг"] || copiedFields["Бүгд"] ? <CheckIcon /> : <CopyIcon />}
            </span>
          </div>
        </div>
        <div className="flex-col flex gap-3">
          <label className="text-sm font-light text-dark">
            街道地址 (Хаяг)
          </label>
          <div className="flex items-center justify-between border border-light rounded-lg px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="stroke stroke-primary">
                <AddressIcon />
              </span>
              <p>{state?.data?.address}</p>
            </div>
            <span
              onClick={() => copyToClipboard(state?.data?.address, "Хаяг")}
              className="stroke stroke-primary cursor-pointer"
            >
              {copiedFields["Хаяг"] || copiedFields["Бүгд"] ? <CheckIcon /> : <CopyIcon />}
            </span>
          </div>
        </div>
        {state?.data?.zipcode ? <div className="flex-col flex gap-3">
          <label className="text-sm font-light text-dark">邮编 (Зип код)</label>
          <div className="flex items-center justify-between border border-light rounded-lg px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="stroke stroke-primary">
                <ZipCodeIcon />
              </span>
              <p>{state?.data?.zipcode}</p>
            </div>
            <span
              onClick={() => copyToClipboard(state?.data?.zipcode, "Зип код")}
              className="stroke stroke-primary cursor-pointer"
            >
              {copiedFields["Зип код"] || copiedFields["Бүгд"] ? <CheckIcon /> : <CopyIcon />}
            </span>
          </div>
        </div> : null}
        <CustomButton
          className="mt-3"
          loading={false}
          title={copiedFields["Бүгд"] ? "Хуулсан" : "Бүгдийг хуулах"}
          onClick={() => {
            const { consignee, phone, region, address, zipcode } = state.data;
            const fullText = `
            ${consignee || ""}
            ${phone || ""}
            ${region || ""}
            ${address || ""}
            ${zipcode || ""}
          `;
            copyToClipboard(fullText.trim(), "Бүгд");
          }}
        />
      </div>
    </div>
  )
}

export default CargoAddress