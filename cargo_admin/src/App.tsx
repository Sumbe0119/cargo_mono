import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SideMenuProvider } from './providers/SideMenuProvider'
import { AppRoutes } from './routes'
import OrganizationContext from './context/OrganizationProvider'
import UserContext from './context/UserProvider'
import { useEffect, useState } from 'react'
interface State {
  loading: boolean
  user?: any
}

function App() {
  // const [state, updateState] = useState<State>({ loading: true, user: null })
  const [state, updateState] = useState<State>({
    loading: true,
  })
  useEffect(() => {
    // loadUser();
  }, [])
  const queryClient = new QueryClient()
  const main = {
    id: 1,
    name: 'Тод од карго / Tod od cargo ',
    phone: '80583384',
    phone1: '96268444',
    address: 'ХУД Нисэхийн тойрог Буянт-Ухаа спорт цогцолборын хажууд Буман төв 1 давхар',
    slug: 'tododcargo',
    national: 'Монгол',
    email: '',
    timetable: '09:00-18:00',
    links: {
      url: 'https://www.facebook.com/profile.php?id=100045469406962',
      name: 'facebook',
    },
    description: 'Түргэн шуурхай хүргэлт',
    logoUrl:
      'https://scontent.fuln8-1.fna.fbcdn.net/v/t39.30808-6/489834907_1297475025111465_3016026117957180450_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=th4XPx7zPVkQ7kNvwEhsef1&_nc_oc=AdlTLVwsaremjHhIb9as9Sv3N31Wf2sJs9ahVcVGnqCOQkHydN_l8TlcDD7PUJH4VEY&_nc_zt=23&_nc_ht=scontent.fuln8-1.fna&_nc_gid=WNgDDEzw0u1vELu7sQPARg&oh=00_AfMxC1He2Cd4Pr09nUQh7OU_d5H3CI1I_UdsjFZIAMyEYA&oe=6852D34D',
    state: 'ACTIVE',
    createdAt: '2025-06-11T03:23:20.757Z',
    updatedAt: '2025-06-14T00:01:34.667Z',
    initialWarehouseId: 1,
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={{ user: state?.user, changeUser: (user) => updateState({ ...state, user }) }}>
          <OrganizationContext.Provider value={{ org: main }}>
            <SideMenuProvider>
              <AppRoutes />
            </SideMenuProvider>
          </OrganizationContext.Provider>
        </UserContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default App
