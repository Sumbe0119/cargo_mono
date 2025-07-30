// import { Route, Routes } from 'react-router-dom'
import Home from '../page/Home'
import AppLayout from '../layout'
import List from '../page/List'
import { Navigate, Route, Routes } from 'react-router'
import Organization from '../page/Organization'
import CargoAddress from '../page/CargoAddress'
import Warehouse from '../page/Warehouse'
import Package from '../page/Package'
import SelectWarehous from '../page/SelectWarehous'
import { useContext } from 'react'
import UserContext from '../context/UserProvider'
import LoginPage from '../page/LoginPage'

export function AppRoutes() {
  const { user } = useContext(UserContext)
  return (
    <Routes>
      {user ? (
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/cargoAddress" element={<CargoAddress />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/selectWarehouse" element={<SelectWarehous />} />
          <Route path="/selectWarehouse/:warehouseId/package" element={<Package />} />
          <Route path="/list" element={<List />} />
        </Route>
      ) : (
        <Route path="/" element={<LoginPage />} />
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
