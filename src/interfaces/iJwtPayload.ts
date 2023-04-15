export interface IJwtPayload {
  id: string;
  iat: number;
  exp: number;
  type: string;
}
export interface IJwtEmailPayload {
  email: string;
  iat: number;
  exp: number;
  type: string;
}
