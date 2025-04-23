import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddressIcon,
  ArrowIcon,
  CopyIcon,
  ImportUserIcon,
  LocationIcon,
  PhoneIcon,
  ZipCodeIcon,
} from "../components/assets/icons";
import CustomButton from "../components/shared/CustomButton";
import toast from "react-hot-toast";

const BranchSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="simple-container xs:space-y-3 lg:space-y-12 xs:px-5 lg:px-0 xs:mt-6 lg:mt-24">
      <div className="xs:hidden lg:flex gap-6">
        <div
          onClick={() => navigate("/address")}
          className="flex items-center h-10 w-10 border border-light rounded fill-transparent cursor-pointer hover:bg-light transition-all justify-center stroke stroke-dark"
        >
          <ArrowIcon />
        </div>
        <h1 className="grid gap-1 leading-3">
          <span className="text-sm font-medium text-black">SkyLine</span>
          <span className="text-base leading-tight font-semibold text-primary">
            Эрээн агуулах хаяг
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
              <p>烸嵪 (Өөрийн утасны дугаар)</p>
            </div>
            <span
              onClick={() => toast.success("Хаяг амжилттай хуулсан")}
              className="stroke stroke-primary"
            >
              <CopyIcon />
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
              <p>15847901990</p>
            </div>
            <span
              onClick={() => toast.success("Хаяг амжилттай хуулсан")}
              className="stroke stroke-primary"
            >
              <CopyIcon />
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
              <p>内蒙古自治区 锡林郭勒盟 二连浩特市社区建设管理局</p>
            </div>
            <span
              onClick={() => toast.success("Хаяг амжилттай хуулсан")}
              className="stroke stroke-primary"
            >
              <CopyIcon />
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
              <p>浩特汇通物流园区C05号 (Өөрийн утасны дугаар)</p>
            </div>
            <span
              onClick={() => toast.success("Хаяг амжилттай хуулсан")}
              className="stroke stroke-primary"
            >
              <CopyIcon />
            </span>
          </div>
        </div>
        <div className="flex-col flex gap-3">
          <label className="text-sm font-light text-dark">邮编 (Зип код)</label>
          <div className="flex items-center justify-between border border-light rounded-lg px-4 py-3">
            <div className="flex items-center gap-4">
              <span className="stroke stroke-primary">
                <ZipCodeIcon />
              </span>
              <p>011100</p>
            </div>
            <span
              onClick={() => toast.success("Хаяг амжилттай хуулсан")}
              className="stroke stroke-primary"
            >
              <CopyIcon />
            </span>
          </div>
        </div>
        <CustomButton
          className="mt-3"
          loading={false}
          onClick={() => toast.success("Хаяг амжилттай хуулсан")}
          title="Бүгдийг хуулах"
        />
      </div>
    </div>
  );
};

export default BranchSingle;
