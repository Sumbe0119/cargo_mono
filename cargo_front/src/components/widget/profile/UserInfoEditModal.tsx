import React, { useEffect, useState } from "react";
import Modal from "../../shared/Modal";
import CustomInput from "../../shared/CustomInput";
import CustomButton from "../../shared/CustomButton";
import toast from "react-hot-toast";
import { CloseIcon } from "../../assets/icons";
import { useMutation } from "@tanstack/react-query";
import { fetchUser } from "../../api";

interface Props {
  open: boolean;
  onClose: () => void;
}

const UserInfoEditModal = ({ open, onClose }: Props) => {
  const user1 = localStorage.getItem('user')
  const user = user1 ? JSON.parse(user1) : null
  const [userData, setUserData] = useState({
    email:  '',
    firstName: '',
    id: null,
    lastName: '',
    prefix: '',
    state: '',
    username:'',
    phone:  null
  })

  
    
  const { mutate } = useMutation({
    mutationFn: fetchUser,
    onSuccess: (data) => {
      setUserData({...data})
      
    },
  })

  useEffect(() => {
    mutate({ id: user?.id })
  }, [user?.id])
  

  const handleSubmit = () => {
    //TODO: api bhgui 
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
            onChange={(val) => setUserData({...userData, firstName: val})}
            placeholder="First name"
            value={userData?.firstName || ''}
            label="Нэр"
            containerClass="mt-2"
          />
          <CustomInput
            onChange={(val) => setUserData({...userData, lastName: val})}
            placeholder="Last name"
            value={userData?.lastName || ''}
            label="Овог"
            containerClass="mt-2"
          />
          <CustomInput
            onChange={(val) => setUserData({...userData, phone: val})}
            placeholder="Phone number"
            value={userData?.phone || ''}
            label="Утасны дугаар"
            containerClass="mt-2"
          />
          <CustomInput
            onChange={(val) => setUserData({...userData, email: val})}
            placeholder="Email"
            value={userData?.email || ""}
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
