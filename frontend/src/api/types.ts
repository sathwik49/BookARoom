export interface ApiResponse<T> {
  success: boolean;
  message: string;
  details: T;
  error_code: string | null;
}

export type GoogleAuthResponseType = ApiResponse<null>;

export type LogOutResponseType = ApiResponse<null>;

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
};

export type GetCurrentUserResponseType = ApiResponse<User>;

export type CreateCrResponseType = ApiResponse<null>;

export type CRType = {
  id: string;
  name: string;
  building: string;
  capacity: number;
  location: string | null;
  createdAt: Date;
};

export type PaginationResponseType = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type GetAllCrParams = {
  page?: number;
  limit?: number;
  search?: string;
  building?: string;
};

export type GetAllCrResponseType = ApiResponse<{
  classrooms: CRType[];
  pagination: PaginationResponseType;
}>;

export type GetCrByIdResponseType = ApiResponse<{ classroom: CRType }>;

export type UpdateCrResponseType = ApiResponse<null>;

export type DeleteCrResponseType = ApiResponse<null>;

export type StatsType = { totalClassrooms: number; totalUsers: number };

export type GetAdminStatsResponseType = ApiResponse<StatsType>;
