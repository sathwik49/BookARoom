import { JwtPayload } from "jsonwebtoken";

export type UserType = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
};

declare global {
  namespace Express {
    interface Request {
      user: UserType;
    }
  }
}

export interface JwtDecodedPayload extends JwtPayload {
  userId: string;
}
