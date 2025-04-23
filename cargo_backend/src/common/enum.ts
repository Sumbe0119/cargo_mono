export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  STAFF = 'STAFF',  
}
export enum CommonState {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  PENDING = 'PENDING',
}
export enum ItemStatus {
  REGISTERED = 'REGISTERED',    // Хамгийн анх бүртгэж авсан
  RECEIVED = 'RECEIVED',        // UB агуулах дээр хүлээн авсан
  SENT = 'SENT',                // Агуулахруу хүргэлтэнд гарсан
  DELIVERED = 'DELIVERED',      // Хүргэлтээр гарсан
  BROKEN = 'BROKEN',            // Эвдэрсэн
  FINISHED = 'FINISHED',        // Дууссан
}

export enum WarehouseType {
  NORMAL = 'NORMAL',            // Энгийн агуулах
  FAST = 'FAST',                // Шуурхай хүргэлт
  // COLD = 'cold', // Хүйтэн цех
  // DANGEROUS = 'dangerous' // Аюултай материал
}