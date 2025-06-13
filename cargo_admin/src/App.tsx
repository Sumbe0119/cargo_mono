import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { CommonProvider } from './context/CommonContext'
import { SideMenuProvider } from './providers/SideMenuProvider'
import { AppRoutes } from './routes'

function App() {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <CommonProvider> */}
          <SideMenuProvider>
            <AppRoutes />
          </SideMenuProvider>
        {/* </CommonProvider> */}
      </QueryClientProvider>
    </>
  )
}

export default App
