export interface EditModalType {
  visible: boolean
  id?: number 
}

export interface ListState {
  loading: boolean
  list: any[]
  total?: number
  page?: number
  error?: any
}