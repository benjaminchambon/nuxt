export interface Formation {
  id: string;
  school: string;
  city: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
