import React from "react";
import Modal from "./Modal";
import {
  BoxIcon,
  CalendarIcon,
  CarIcon,
  SuccessIcon,
  TrakCodeIcon,
  UserIcon,
  WalletIcon,
  WareHouseIcon,
} from "../assets/icons";
import { getFormatMoney } from "../utils/common";
import { create } from "domain";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

const OrderModal = ({ open, onClose }: Props) => {
  return (
    <Modal open={open} onClose={() => onClose()}>
      <div className="flex flex-col xs:w-screen lg:w-[500px] xs:p-4 lg:p-8 space-y-4">
        <div className="flex-col flex leading-none gap-2 w-full items-center">
          <span className="flex items-center justify-center h-11 w-11 rounded-full border border-success stroke-success">
            <SuccessIcon />
          </span>
          <p className="text-sm text-success font-medium">Захиалга дууссан</p>
        </div>
        <div className="grid gap-4 border border-light rounded-lg p-4">
          <div className="flex items-start font-medium text-black text-base gap-3 border-b border-light pb-2.5">
            <span className="stroke-black">
              <TrakCodeIcon size="20" />
            </span>
            <div className="grid gap-2 leading-none">
              <p> Трак код:</p>
              <span className="text-dark/80 font-normal text-sm">
                TYU3985903743
              </span>
            </div>
          </div>
          <div className="flex items-start font-medium text-black text-base gap-3 border-b border-light pb-2.5">
            <span className="stroke-black">
              <UserIcon size="20" />
            </span>
            <div className="grid gap-2 leading-none">
              <p>Захиалагч:</p>
              <span className="text-dark/80 font-normal text-sm">
                Т. Сүмбээ /86662422/
              </span>
            </div>
          </div>
          <div className="flex items-start font-medium text-black text-base gap-3 border-b border-light pb-2.5">
            <span className="stroke-black">
              <CalendarIcon size="20" />
            </span>
            <div className="grid gap-2 leading-none">
              <p>Бүртгэгдсэн огноо:</p>
              <span className="text-dark/80 font-normal text-sm">
                2025, 03 сарын 31, 10:23цаг минутанд
              </span>
            </div>
          </div>
          <div className="flex items-start font-medium text-black text-base gap-3">
            <span className="stroke-black">
              <WalletIcon size="20" />
            </span>
            <div className="grid gap-2 leading-none">
              <p>Төлбөрийн дүн:</p>
              <span className="text-dark/80 font-normal text-sm">4'000₮</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;
