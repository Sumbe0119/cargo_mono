import React from "react";
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
interface Props {
  open: boolean;
  onClose: () => void;
}

const LeftSideMenu = ({ open, onClose }: Props) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction="left"
      className="!w-[300px] px-6 py-8 flex-col flex justify-between"
    >
      <ul className="flex-col flex gap-3">
        <li className="text-[16px] font-medium text-dark">Бараа хайх заавар</li>
        <li className="text-[16px] font-medium text-dark">Таобао холбох</li>
        <li className="text-[16px] font-medium text-dark">Pindoadoa холбох</li>
      </ul>
      <p className="text-sm text-dark/70 font-light">© Smart transit</p>
    </Drawer>
  );
};

export default LeftSideMenu;
