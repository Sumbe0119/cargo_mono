import { createContext } from "react";
interface OrganizationContextState {
  org?: any
  setOrg?: (org?: any) => void
}
const OrganizationContext = createContext<OrganizationContextState>({})
export default OrganizationContext