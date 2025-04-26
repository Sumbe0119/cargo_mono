import React, { useState } from "react";
import Modal from "./Modal";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api";

interface Props {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: Props) => {
  const [user, setUser] = useState({ name: '', password: '' })
  

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      if (data) {
        localStorage.setItem('user', JSON.stringify(data))
        onClose();
      }
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  })

  const handleSubmit = () => {
    mutate({phone: user.name, password: user?.password })
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
            onChange={(val) => setUser({...user, name: val })}
            value={user.name}
          />
          <CustomInput
            placeholder="Нууц үг"
            type= 'password'
            onChange={(val) => setUser({...user,password:val })}
            value={user.password}
          />
          <div className="pt-2 w-full space-y-3">
            <p className="text-sm font-regular text-dark/80">
              Шинэ хэрэглэгч бол?{" "}
              <span className="text-primary font-medium hover:underline cursor-pointer">
                Бүртгүүлэх
              </span>
            </p>
            <CustomButton
              loading={isPending}
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
