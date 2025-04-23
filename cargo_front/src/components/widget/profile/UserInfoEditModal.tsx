import React from "react";
import Modal from "../../shared/Modal";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import toast from "react-hot-toast";
import { CloseIcon } from "../../assets/icons";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserInfoEditModal = ({ open, onClose }: Props) => {
  const handleSubmit = () => {
    toast.success(`Мэдээлэл амжилттай солигдлоо`);
    onClose();
  };
  return (
    <Modal onClose={onClose} open={open}>
      <div className="xs:w-full lg:w-[500px] ">
        <div className="flex items-center justify-between border-b border-b-light py-4 px-5 w-screen">
          <h1 className="text-md text-black font-medium">
            Хэрэглэчийн мэдээлэл
          </h1>
          <span onClick={() => onClose()} className={`fill-black`}>
            <CloseIcon />
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 px-6 pt-4 pb-6 ">
          <CustomInput
            onChange={() => console.info("object")}
            placeholder="First name"
            value={""}
            label="Нэр"
            containerClass="mt-2"
          />
          <CustomInput
            onChange={() => console.info("object")}
            placeholder="Last name"
            value={""}
            label="Овог"
            containerClass="mt-2"
          />
          <CustomInput
            onChange={() => console.info("object")}
            placeholder="Phone number"
            value={""}
            label="Утасны дугаар"
            containerClass="mt-2"
          />
          <CustomInput
            onChange={() => console.info("object")}
            placeholder="Email"
            value={""}
            label="Имэйл хаяг"
            containerClass="mt-2"
          />
          <CustomButton
            className="w-full mt-3"
            loading={false}
            onClick={() => handleSubmit()}
            title="Хадгалах"
          />
        </div>
      </div>
    </Modal>
  );
};

export default UserInfoEditModal;
