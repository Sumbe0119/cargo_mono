import { createContext } from 'react'
interface UserContextState {
  user?: any
  changeUser?: (user?: any) => void
}
const UserContext = createContext<UserContextState>({})
export default UserContext
