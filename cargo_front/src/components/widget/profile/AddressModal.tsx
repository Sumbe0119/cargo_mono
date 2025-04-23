import React, { useState } from "react";
import Modal from "../../shared/Modal";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import toast from "react-hot-toast";
import { CloseIcon, HomeIcon, JobIcon, LocationIcon } from "../../assets/icons";
import CustomSelect from "../../shared/CustomSelect";

interface Props {
  open: boolean;
  onClose: () => void;
}

enum AddressType {
  HOME = "HOME",
  JOB = "JOB",
  OTHER = "OTHER",
}

const typeList = [
  { value: "Гэр", key: AddressType.HOME, icon: <HomeIcon size="18" /> },
  { value: "Ажил", key: AddressType.JOB, icon: <JobIcon size="18" /> },
  { value: "Бусад", key: AddressType.OTHER, icon: <LocationIcon size="18" /> },
];

const AddressModal = ({ open, onClose }: Props) => {
  const [type, setType] = useState(AddressType.HOME);
  const handleSubmit = () => {
    toast.success(`Мэдээлэл амжилттай солигдлоо`);
    onClose();
  };

  return (
    <Modal onClose={onClose} open={open}>
      <div className="xs:w-full lg:w-[700px]">
        <div className="flex items-center justify-between border-b border-b-light py-4 px-5">
          <h1 className="text-md text-black font-medium">Шинэ хаяг оруулах</h1>
          <span onClick={() => onClose()} className={`fill-black`}>
            <CloseIcon />
          </span>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="flex-col flex space-y-2">
            <p className="text-sm font-medium text-dark">Хаягын төрөл сонгох</p>
            <div className="flex items-center gap-3">
              {typeList.map((item, index) => {
                const isActive = item.key == type;
                return (
                  <div
                    onClick={() => setType(item.key)}
                    key={index}
                    className={`group flex gap-2.5 items-center leading-none ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary border-primary/10"
                    }  rounded h-10 px-3  text-sm transition-all cursor-pointer border border-primary`}
                  >
                    <div
                      className={`flex items-center ${
                        isActive ? "stroke-white" : "stroke-primary"
                      }  transition-all`}
                    >
                      {item.icon}
                    </div>
                    {item.value}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <CustomInput
              onChange={() => console.info("object")}
              placeholder="Нэр"
              value={""}
              label="Нэр"
              containerClass="mt-2"
            />
            <CustomInput
              onChange={() => console.info("object")}
              placeholder="Овог"
              value={""}
              label="Овог"
              containerClass="mt-2"
            />
            <CustomInput
              onChange={() => console.info("object")}
              placeholder="Утасны дугаар"
              value={""}
              label="Утас"
              containerClass="mt-2"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <CustomSelect>
              <option>Улаанбаатар</option>
              <option>МАйаг</option>
            </CustomSelect>
            <CustomSelect>
              <option>Хан уул дүүрэг</option>
              <option>Сонгино хайрхан</option>
            </CustomSelect>
            <CustomSelect>
              <option>4р хороо</option>
              <option>МАйаг</option>
            </CustomSelect>
          </div>
          <textarea
            className="border border-light rounded-lg w-full outline-none p-3 placeholder:text-sm"
            placeholder="Та хаягаа зөв дэлгэрэнгүй, тодорхой оруулаагүйгээс үүдэн хүргэлт удаашрах, эсвэл хүргэгдэхгүй байж болзошгүйг анхаарна уу."
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

export default AddressModal;
