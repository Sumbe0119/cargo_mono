import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import MainLayout from '../components/layout'
import About from '../pages/About'
import Calculate from '../pages/Calculate'
import Address from '../pages/Address'
import Terms from '../pages/Terms'
import BranchSingle from '../pages/BranchSingle'
import Profile from '../pages/Profile'
import Order from '../pages/Order'
import PasswordChange from '../pages/PasswordChange'
import ProfileLayout from '../components/layout/ProfileLayout'
import Notfound from '../components/layout/Notfound'

const AppRoutes = () => {
  const data = localStorage.getItem('user')
  const user = data ? JSON.parse(data) : null
  
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/calculate" element={<Calculate />} />
            <Route path="/address" element={<Address />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/branch/:id" element={<BranchSingle />} />
            {user ? (
              <>
                <Route path="/profile" element={<ProfileLayout />}>
                  <Route index element={<Profile />} />
                  <Route path="order" element={<Order />} />
                  <Route path="password" element={<PasswordChange />} />
                </Route>
                <Route path="/profile/mobile" element={<Profile />} />
                <Route path="/password" element={<PasswordChange />} />
                <Route path="/order" element={<Order />} />
              </>
            ) : null}

            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default AppRoutes
