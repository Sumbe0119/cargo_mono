import React, { useContext, useState } from 'react'


interface CommonProps {
  socket?: any
}

const CommonContext = React.createContext<CommonProps | undefined>(undefined)

export const useCommonContext = (): CommonProps => useContext(CommonContext) as CommonProps

export function CommonProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<any>(null)
  setSocket(false)
  return (
    <CommonContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </CommonContext.Provider>
  )
}
