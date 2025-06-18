// import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import AppLayout from '../layout'
import List from '../page/List'
import { Navigate, Route, Routes } from 'react-router'
import Organization from '../page/Organization'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/list" element={<List />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
