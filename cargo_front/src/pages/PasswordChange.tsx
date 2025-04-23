import React from "react";
import CustomInput from "../components/shared/CustomInput";
import CustomButton from "../components/shared/CustomButton";

const PasswordChange = () => {
  return (
    <div className="flex flex-col xs:gap-3 lg:gap-6 w-full xs:px-6">
      <h2 className="text-lg font-semibold text-primary">Нууц үг солих</h2>
      <CustomInput
        label="Одоогийн нууц үг"
        placeholder="Нууц үг"
        value={""}
        onChange={(e) => console.info("")}
        // error={formErrors.weight}
      />
      <CustomInput
        label="Шинэ нууц үг"
        placeholder="Шинэ Нууц үг"
        value={""}
        onChange={(e) => console.info("")}
        // error={formErrors.weight}
      />
      <CustomInput
        label="Нууц үг давтах"
        placeholder="Нууц үг давтах"
        value={""}
        onChange={(e) => console.info("")}
        // error={formErrors.weight}
      />
      <CustomButton
        loading={false}
        onClick={() => console.info("object")}
        title="Нууц үг солих"
        className="!mt-4"
      />
    </div>
  );
};

export default PasswordChange;
