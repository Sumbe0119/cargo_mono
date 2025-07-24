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

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/organization" element={<Organization />} />
        <Route path="/cargoAddress" element={<CargoAddress />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="/selectWarehouse" element={<SelectWarehous />} />
        <Route path="/selectWarehouse/:warehouseId/package" element={<Package />} />
        <Route path="/list" element={<List />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
