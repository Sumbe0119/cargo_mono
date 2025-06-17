import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment } from "react";
import { CloseIcon } from "../assets/icons";

interface Props {
  open: boolean;
  onClose: () => void;
  children: any;
}

const Modal = ({ open, onClose, children }: Props) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => onClose && onClose()}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`fixed inset-0 z-50 cursor-pointer bg-black/80`} />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden z-[999] block">
          <div className="flex min-h-dvh items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogPanel
                className={`xs:rounded-lg lg:rounded-2xl overflow-hidden shadow-card border-x border-interface-borders bg-white mx-auto relative w-full max-w-[460px]`}
              >
                <div
                  className={`fixed right-[22px] top-[22px] rounded-full h-10 w-10 xs:hidden lg:flex items-center justify-center cursor-pointer hover:opacity-80`}
                  onClick={onClose}
                >
                  <span className={`fill-white`}>
                    <CloseIcon size={"32"} />
                  </span>
                </div>
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
