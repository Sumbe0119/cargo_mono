import React, { Children } from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

const MainLayout = () => {
  // const { pathname } = useLocation();
  return (
    <div className={``}>
      <MainHeader />
      <div className="custom-min-h-screen">
        <div className="pb-16">
          <Outlet />
        </div>
        {/* <MainFooter /> */}
      </div>
    </div>
  );
};

export default MainLayout;
