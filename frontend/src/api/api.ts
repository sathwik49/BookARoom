import { axiosClient, endPoints } from "./axios";
import type {
  GetCurrentUserResponseType,
  GoogleAuthResponseType,
} from "./types";

export const googleLoginMutation = async (
  token: string,
): Promise<GoogleAuthResponseType> => {
  const res = await axiosClient.post(endPoints.AUTH.GOOGLE, { token });
  return res.data;
};

export const getMeQuery = async (): Promise<GetCurrentUserResponseType> => {
  const res = await axiosClient.get(endPoints.AUTH.ME);
  return res.data;
};
