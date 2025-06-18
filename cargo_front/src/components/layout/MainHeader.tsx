import React, { useContext, useState } from 'react'
import { AddressIcon, ArrowIcon, CalculateIcon, HomeIcon, LoginIcon, MenuIcon, UserIcon } from '../assets/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import LoginModal from '../shared/LoginModal'
import { useMediaQuery } from 'react-responsive'
import LeftSideMenu from './LeftSideMenu'
import OrganizationContext from '../provider/OrganizationProvider'

const menus = [
  // { title: "Бидний тухай", link: "/about" },
  { title: 'Тооцоолуур', link: '/calculate' },
  { title: 'Хаяг холбох', link: '/address' },
  // { title: "Үйлчилгээний нөхцөл", link: "/terms" },
]

const MainHeader = () => {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const data = localStorage.getItem('user')
  const user = data ? JSON.parse(data) : null
  const { org } = useContext(OrganizationContext)
  const navigate = useNavigate()
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  const renderTitle = () => {
    switch (pathname) {
      case '/':
        return 'Нүүр'
      case '/calculate':
        return 'Тооцоолуур'
      case '/address':
        return 'Хаяг холбох'
      case '/profile':
        return 'Профайл'
    }
  }
  return (
    <>
      {/* desktop header start */}
      <header className="xs:hidden lg:flex sticky w-full items-center top-0 bg-white z-10 h-[69px] border-b border-b-light py-3">
        <div className="text-sm container mx-auto flex items-center justify-between xs:px-2 2xl:px-0">
          <div className="container flex items-center justify-between">
            <div className="flex items-center gap-6 xs:px-4 lg:px-0">
              <Link to={`/`}>
                <img className="h-11" alt="logo" src="./logo.png" />
              </Link>

              <ul className="xs:hidden lg:flex items-center font-semibold gap-4 divide-x divide-x-dark">
                <li>
                  <Link
                    to="/"
                    className={`transition-all ${pathname === '/' ? 'text-primary stroke-primary' : 'text-black stroke-black'
                      } hover:text-primary flex items-center justify-center text-base`}
                  >
                    {/* <div className="flex items-center stroke-2 px-3 transition-all hover:stroke-primary">
                      <HomeIcon />
                    </div> */}
                    Нүүр хуудас
                  </Link>
                </li>
                {menus?.map((item, index) => {
                  const isActive = pathname === item?.link
                  return (
                    <li key={index}>
                      <Link
                        to={item?.link}
                        // style={{ fontWeight: "400" }}
                        className={`${isActive ? 'text-primary' : 'text-black'} hover:text-primary transition-text text-base p-4`}
                      >
                        {item?.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
            {user ? (
              <Link
                to="/profile"
                className="stroke-dark flex items-center gap-2 h-11 px-6 border border-dark/50 rounded-2xl hover:bg-dark/10 cursor-pointer"
              >
                <span className={`stroke-2`}>
                  <UserIcon size={'18'} />
                </span>
                <span className="font-medium leading-none">{user?.username || ''}</span>
              </Link>
            ) : (
              <div
                onClick={() => setVisible(true)}
                className="text-white stroke-white hover:text-primary hover:stroke-primary transition-text hover:bg-primary/10 
      hover:border-primary/10 bg-primary border border-primary rounded-2xl flex items-center h-11 px-6 gap-2 cursor-pointer"
              >
                <span className={`stroke-2`}>
                  <LoginIcon size={'18'} />
                </span>
                <span className="font-medium leading-none">Нэвтрэх</span>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* desktop header end */}
      {/* mobile header start */}

      <header className="xs:flex lg:hidden items-center justify-between border-b border-light sticky w-full top-0 z-10 h-[54px] px-4 bg-white">
        <div
          onClick={() => navigate(-1)}
          className={`${(pathname === '/' && 'hidden') ||
            (pathname === '/calculate' && 'hidden') ||
            (pathname === '/address' && 'hidden') ||
            (pathname === '/profile' && 'hidden')
            } fill-white stroke-1 stroke-black h-9 w-9 flex items-center justify-center border border-light rounded-lg pr-1 cursor-pointer z-20`}
        >
          <ArrowIcon size="22" />
        </div>
        <p className="text-dm font-semibold text-black">{renderTitle()}</p>

        {/* <div
          onClick={() => setDrawer(!drawer)}
          className={`${
            ["/", "/calculate", "/address"].includes(pathname)
              ? "xs:block"
              : "hidden"
          }xs:block lg:hidden pr-3`}
        >
          <MenuIcon />
        </div> */}
      </header>
      {/* mobile header end */}

      {/* <div className="xs:h-16 lg:h-28"></div> */}
      <footer
        className={`${['/', '/calculate', '/address', '/profile'].includes(pathname) ? 'xs:grid' : 'hidden'
          } ${org ? 'grid-cols-4' : 'grid-cols-2'} lg:hidden fixed !bg-white z-10 bottom-0 border-t border-t-light h-16 w-full items-center justify-evenly`}
      >
        <Link to={`/`} className={`flex-col flex items-center gap-px text-xs font-regular ${pathname === '/' ? 'text-primary' : 'text-dark'}`}>
          <span
            className={`flex items-center stroke-2 px-4 ${pathname === '/' ? 'stroke-primary' : 'stroke-dark'} transition-all hover:stroke-primary`}
          >
            <HomeIcon />
          </span>
          Нүүр
        </Link>
        {org ? (
          <Link
            to={`/calculate`}
            className={`flex-col flex items-center gap-px text-xs font-regular ${pathname === '/calculate' ? 'text-primary' : 'text-dark'}`}
          >
            <span
              className={`flex items-center stroke-2 px-4 ${pathname === '/calculate' ? 'stroke-primary' : 'stroke-dark'
                } transition-all hover:stroke-primary`}
            >
              <CalculateIcon />
            </span>
            Тооцоолуур
          </Link>
        ) : null}
        {org ? (
          <Link
            to={`/address`}
            className={`flex-col flex items-center gap-px text-xs font-regular ${pathname === '/address' ? 'text-primary' : 'text-dark'}`}
          >
            <span
              className={`flex items-center stroke-2 px-4 ${pathname === '/address' ? 'stroke-primary' : 'stroke-dark'
                } transition-all hover:stroke-primary`}
            >
              <AddressIcon />
            </span>
            Хаяг холбох
          </Link>
        ) : null}
        {!user ? (
          <div
            onClick={() => setVisible(true)}
            className={`flex-col flex items-center gap-px text-xs font-regular ${pathname === '/address' ? 'text-primary' : 'text-dark'}`}
          >
            <span
              className={`flex items-center stroke-2 px-4 ${pathname === '/address' ? 'stroke-primary' : 'stroke-dark'
                } transition-all hover:stroke-primary`}
            >
              <LoginIcon />
            </span>
            Нэвтрэх
          </div>
        ) : (
          <Link
            to={`/profile`}
            className={`flex-col flex items-center gap-px text-xs font-regular ${pathname === '/profile' ? 'text-primary' : 'text-dark'}`}
          >
            <span
              className={`flex items-center stroke-2 px-4 ${pathname === '/profile' ? 'stroke-primary' : 'stroke-dark'
                } transition-all hover:stroke-primary`}
            >
              <UserIcon size="22" />
            </span>
            <p className="truncate max-w-[70px]">{user?.firstName}</p>
          </Link>
        )}
      </footer>
      <LoginModal open={visible} onClose={() => setVisible(false)} />
      <LeftSideMenu open={drawer} onClose={() => setDrawer(false)} />
    </>
  )
}

export default MainHeader
