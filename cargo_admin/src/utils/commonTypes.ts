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

export type WarehouseFieldType = {
  organizationId: number
  name: string
  address: string
  region: string
  type: string
  totalCapacity: string
  staffCount: string
  contactInfo: {
    phone: string
    email: string
  }
  currency: {
    kg: string
    m3: string
    rate: string
  }
  operatingHours: {
    weekdays: string
    weekends: string
  }
}

export enum WarehouseType {
  NORMAL = 'NORMAL', // Энгийн агуулах
  FAST = 'FAST', // Шуурхай хүргэлт
  // COLD = 'cold', // Хүйтэн цех
  // DANGEROUS = 'dangerous' // Аюултай материал
}
