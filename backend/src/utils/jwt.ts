import jwt from "jsonwebtoken";
import appConfig from "../config/appConfig";

export const generateJwtToken = (payload: any) => {
  const token = jwt.sign(payload, appConfig.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
