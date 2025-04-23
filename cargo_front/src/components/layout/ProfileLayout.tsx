import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowIcon, BoxIcon, PasswordIcon, UserIcon } from "../assets/icons";
import MediaQuery, { useMediaQuery } from "react-responsive";

const ProfileLayout = () => {
  const { pathname } = useLocation();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <MediaQuery minWidth={769}>
        <div className="container flex gap-6 xs:mt-6 lg:mt-24">
          <div className="block w-[340px] border border-light rounded-lg">
            <div className="flex-col flex px-5 py-3">
              <Link
                to={`/profile`}
                className={`text-base font-semibold flex gap-3 items-center h-11 cursor-pointer ${
                  pathname === "/profile" ? "text-dark " : "text-dark/50"
                }`}
              >
                <div
                  className={`fill-white stroke-1 ${
                    pathname == "/profile" ? "stroke-dark" : "stroke-dark/50"
                  } `}
                >
                  <UserIcon size="20" />
                </div>
                Миний
              </Link>
              <Link
                to={`/profile/order`}
                className={`text-base font-semibold flex gap-3 items-center h-11 cursor-pointer ${
                  pathname === "/profile/order" ? "text-dark " : "text-dark/50"
                }`}
              >
                <div
                  className={`fill-white stroke-1 ${
                    pathname == "/profile/order"
                      ? "stroke-dark"
                      : "stroke-dark/50"
                  } `}
                >
                  <BoxIcon size="20" />
                </div>
                Захиалгын хуудас
              </Link>
              <Link
                to={`/profile/password`}
                className={`text-base font-semibold flex gap-3 items-center h-11 cursor-pointer ${
                  pathname === "/profile/password"
                    ? "text-dark "
                    : "text-dark/50"
                }`}
              >
                <div
                  className={`fill-white stroke-1 ${
                    pathname == "/profile/password"
                      ? "stroke-dark"
                      : "stroke-dark/50"
                  } `}
                >
                  <PasswordIcon size="20" />
                </div>
                Нууц үг солих
              </Link>
            </div>
          </div>
          <Outlet />
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        <div className="flex-col flex">
          <Link
            to={`/profile/mobile`}
            className="flex items-center justify-between border-b border-b-light bg-light px-6 py-4"
          >
            <div className="flex items-center gap-4">
              <div
                className={`fill-white stroke-1 stroke-white troke-dark/50 h-10 w-10 bg-dark/40 rounded flex items-center justify-center`}
              >
                <UserIcon />
              </div>
              <div className="flex-col flex leading-normal">
                <h1 className="text-base font-medium text-black">Сүмбэ</h1>
                <p className="text-dark font-light text-sm">86662422</p>
              </div>
            </div>
            <div className="fill-light stroke-1 stroke-primary -rotate-180 pr-1">
              <ArrowIcon size="28" />
            </div>
          </Link>
          <div className="px-5">
            <Link
              to={`/order`}
              className={`text-base font-semibold flex gap-3 items-center h-11 cursor-pointer ${
                pathname === "/profile/order" ? "text-dark " : "text-dark/50"
              }`}
            >
              <div
                className={`fill-white stroke-1 ${
                  pathname == "/profile/order"
                    ? "stroke-dark"
                    : "stroke-dark/50"
                } `}
              >
                <BoxIcon size="20" />
              </div>
              Захиалгын хуудас
            </Link>
            <Link
              to={`/password`}
              className={`text-base font-semibold flex gap-3 items-center h-11 cursor-pointer ${
                pathname === "/profile/password" ? "text-dark " : "text-dark/50"
              }`}
            >
              <div
                className={`fill-white stroke-1 ${
                  pathname == "/profile/password"
                    ? "stroke-dark"
                    : "stroke-dark/50"
                } `}
              >
                <PasswordIcon size="20" />
              </div>
              Нууц үг солих
            </Link>
          </div>
        </div>
      </MediaQuery>
    </>
  );
};

export default ProfileLayout;
