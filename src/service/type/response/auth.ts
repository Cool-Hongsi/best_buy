export interface LoginResponse {
  statusCode: number;
  email: string;
  username: string;
  accessToken: string;
  refreshToken: string;
}
