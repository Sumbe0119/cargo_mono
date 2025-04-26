import React, { use, useState } from "react";
import {
  AddressIcon,
  EmailIcon,
  GeneralIcon,
  LocationIcon,
  PhoneIcon,
  User2Icon,
  UserEditIcon,
  UserIcon,
} from "../components/assets/icons";
import UserInfoEditModal from "../components/widget/profile/UserInfoEditModal";
import AddressModal from "../components/widget/profile/AddressModal";
import { useMediaQuery } from "react-responsive";

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [address, setAddress] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <>
      <div className="flex flex-col gap-6 w-full xs:px-5 lg:px-0">
        <h2 className="text-lg font-semibold text-primary">Үндсэн мэдээлэл</h2>
        <div className="border border-light rounded-lg py-4 space-y-3">
          <div className="flex items-center justify-between border-b border-b-light pb-3 px-4">
            <div className="grid">
              <h2 className="flex items-center text-dm font-medium text-black gap-3">
                Хэрэглэч
                <span className="stroke stroke-black">
                  <GeneralIcon size="18" />
                </span>
              </h2>
              <p className="xs:w-[190px] sm:w-[300px] xs:text-[13px] sm:text-sm leading-tight font-light text-dark mt-1">
                Та өөрийн мэдээллийг үнэн зөв оруулснаар гарч болох эрсдэлээс сэргийлж  болно. /Буруу хүнд ачаа өгөх, хүргийлтийн ажилтан андуурах, бараа солигдох/
              </p>
            </div>
            <div
              onClick={() => setEdit(true)}
              className="flex items-center gap-3 bg-warning h-9 px-4 rounded text-sm font-medium cursor-pointer hover:bg-warning/50 transition-all border border-warning"
            >
              <span className="stroke stroke-black">
                <UserEditIcon size="18" />
              </span>
              {isMobile ? "Засах" : "Мэдээлэл засварлах"}
            </div>
          </div>
          <div className="grid xs:grid-cols-1 gap-1 lg:grid-cols-4 px-4">
            <div className="block space-y-2">
              <label className="text-xs text-dark/70">Овог</label>
              <div className="flex gap-3">
                <div className="fill-white stroke-1 stroke-dark">
                  <UserIcon size="20" />
                </div>
                <p className="text-base font-semibold text-dark">
                  Mr Donald trump
                </p>
              </div>
            </div>
            <div className="block space-y-2">
              <label className="text-xs text-dark/70">Нэр</label>
              <div className="flex gap-3">
                <div className="fill-white stroke-1 stroke-dark">
                  <User2Icon size="20" />
                </div>
                <p className="text-base font-semibold text-dark">Elon Musk</p>
              </div>
            </div>
            <div className="block space-y-2">
              <label className="text-xs text-dark/70">Email</label>
              <div className="flex gap-3">
                <div className="fill-white stroke-1 stroke-dark">
                  <EmailIcon size="20" />
                </div>
                <p className="text-base font-semibold text-dark">
                  Elon1232@gmail.com
                </p>
              </div>
            </div>
            <div className="block space-y-2">
              <label className="text-xs text-dark/70">Утасны дугаар</label>
              <div className="flex gap-3">
                <div className="fill-white stroke-1 stroke-dark">
                  <PhoneIcon size="20" />
                </div>
                <p className="text-base font-semibold text-dark">77773883</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-light rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="grid">
              <h2 className="flex items-center text-dm font-medium text-black gap-3">
                Хүргэлтийн хаяг
                <span className="stroke stroke-black">
                  <AddressIcon size="18" />
                </span>
              </h2>
              <p className="xs:w-[190px] sm:w-[300px] xs:text-[13px] sm:text-sm leading-tight font-light text-dark mt-1">
                Та хүргэлтийн хаягаа оруулснаар захиалга хийхдээ тухайн хаягийг
                хялбар ашиглах боломжтой
              </p>
            </div>
            <div
              onClick={() => setAddress(true)}
              className="flex items-center gap-3 bg-warning h-9 px-4 rounded xs:text-xs sm:text-sm font-medium cursor-pointer hover:bg-warning/50 transition-all border border-warning"
            >
              <span className="stroke stroke-black">
                <LocationIcon size="18" />
              </span>
              {isMobile ? "Шинэ хаяг" : "Шинэ хаяг үүсгэх"}
            </div>
          </div>
        </div>
      </div>
      {edit && <UserInfoEditModal onClose={() => setEdit(false)} open={edit} />}
      {address && <AddressModal onClose={() => setAddress(false)} open={address} />}
    </>
  );
};

export default Profile;
