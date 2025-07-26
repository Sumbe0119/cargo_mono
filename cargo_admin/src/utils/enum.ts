export enum ItemStatus {
  REGISTERED = 'REGISTERED',    // Хамгийн анх бүртгэж авсан
  RECEIVED = 'RECEIVED',        // UB агуулах дээр хүлээн авсан
  SENT = 'SENT',                // Агуулахруу хүргэлтэнд гарсан
  DELIVERED = 'DELIVERED',      // Хүргэлтээр гарсан
  BROKEN = 'BROKEN',            // Эвдэрсэн
  FINISHED = 'FINISHED',        // Дууссан
}

export enum CommonState {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  PENDING = 'PENDING',
}