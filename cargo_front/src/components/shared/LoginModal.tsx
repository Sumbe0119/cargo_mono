import React from "react";
import Modal from "./Modal";
import { BoxIcon } from "../assets/icons";
import { getFormatMoney } from "../utils/common";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: Props) => {
  const handleSubmit = () => {
    onClose();
    toast.success(`Сайн байна уу ${`USER`}`);
  };
  return (
    <Modal open={open} onClose={() => onClose()}>
      <div className="block xs:w-[310px] lg:w-[460px] p-6">
        <div className="grid gap-2 leading-none mb-6">
          <h1 className="text-lg font-bold text-primary">Нэвтрэх</h1>
        </div>
        <div className="flex-col flex space-y-5 w-full">
          <CustomInput
            placeholder="Утасны дугаар"
            onChange={() => console.info("object")}
            value={""}
          />
          <CustomInput
            placeholder="Нууц үг"
            onChange={() => console.info("object")}
            value={""}
          />
          <div className="pt-2 w-full space-y-3">
            <p className="text-sm font-regular text-dark/80">
              Шинэ хэрэглэгч бол?{" "}
              <span className="text-primary font-medium hover:underline cursor-pointer">
                Бүртгүүлэх
              </span>
            </p>
            <CustomButton
              loading={false}
              className="w-full"
              onClick={() => handleSubmit()}
              title="Нэвтрэх"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
