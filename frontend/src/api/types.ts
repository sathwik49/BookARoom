export interface ApiResponse<T> {
  success: boolean;
  message: string;
  details: T | null;
  error_code: string | null;
}

export type GoogleAuthResponseType = ApiResponse<null>;

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
};

export type GetCurrentUserResponseType = ApiResponse<User>;
