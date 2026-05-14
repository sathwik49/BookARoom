import type {
  CreateClassroomSchemaType,
  UpdateClassroomSchemaType,
} from "@/validations/classroom.validation";
import { axiosClient, endPoints } from "./axios";
import type {
  CreateCrResponseType,
  DeleteCrResponseType,
  GetAdminStatsResponseType,
  GetAllCrParams,
  GetAllCrResponseType,
  GetCrByIdResponseType,
  GetCurrentUserResponseType,
  GoogleAuthResponseType,
  LogOutResponseType,
  UpdateCrResponseType,
} from "./types";

export const googleLoginMutation = async (
  token: string,
): Promise<GoogleAuthResponseType> => {
  const res = await axiosClient.post(endPoints.AUTH.GOOGLE, { token });
  return res.data;
};

export const logOutMutation = async (): Promise<LogOutResponseType> => {
  const res = await axiosClient.post(endPoints.AUTH.LOGOUT);
  return res.data;
};

export const getMeQuery = async (): Promise<GetCurrentUserResponseType> => {
  const res = await axiosClient.get(endPoints.AUTH.ME);
  return res.data;
};

export const createCrMutation = async (
  data: CreateClassroomSchemaType,
): Promise<CreateCrResponseType> => {
  const res = await axiosClient.post(endPoints.CR.CREATE, data);
  return res.data;
};

export const updateCrMutation = async (
  data: UpdateClassroomSchemaType,
  id: string,
): Promise<UpdateCrResponseType> => {
  const res = await axiosClient.patch(endPoints.CR.UPDATE(id), data);
  return res.data;
};

export const deleteCrMutation = async (
  id: string,
): Promise<DeleteCrResponseType> => {
  const res = await axiosClient.delete(endPoints.CR.DELETE(id));
  return res.data;
};

export const getCrByIdQuery = async (
  id: string,
): Promise<GetCrByIdResponseType> => {
  const res = await axiosClient.get(endPoints.CR.GET_BY_ID(id));
  return res.data;
};

export const getAllCrQuery = async ({
  page = 1,
  limit = 5,
  search,
  building,
}: GetAllCrParams): Promise<GetAllCrResponseType> => {
  const res = await axiosClient.get(endPoints.CR.GET_ALL, {
    params: {
      page,
      limit,
      search,
      building,
    },
  });

  return res.data;
};

export const getAdminStatsQuery =
  async (): Promise<GetAdminStatsResponseType> => {
    const res = await axiosClient.get(endPoints.USER.GET_STATS);
    return res.data;
  };
